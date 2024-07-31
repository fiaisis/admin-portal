beforeEach(() => {
  // open admin-portal
  const URL = Cypress.config('baseUrl') as string;
  cy.visit(URL);
});

describe('E2E Test', () => {
  it('Opens the root page', () => {
    cy.contains('Specifications');
  });
});

describe('E2E Test', () => {
  it('Opens specification page', () => {
    cy.contains('Specifications').click();
    cy.url().should('include', '/specification/MARI');
  });
});

describe('E2E Test', () => {
  it('View specification', () => {
    const specification = { now: false, call: false, term: false };
    const specificationString = JSON.stringify(specification);
    console.log(specificationString);
    // predefine GET Specification API calls to force stubbing of request
    // https://stackoverflow.com/a/68945338
    cy.intercept(
      {
        method: 'GET',
        url: '*/api/instrument/*/specification',
        hostname: 'localhost',
      },
      {
        statusCode: 200,
        body: specification,
      }
    ).as('getSpecification');

    cy.visit(Cypress.config('baseUrl') as string);
    cy.contains('Specifications').click();

    // GET instrument list
    cy.intercept(
      {
        method: 'GET',
        url: '*/api/instrument/',
        hostname: 'localhost',
      },
      {
        statusCode: 200,
        body: specification,
      }
    );

    // GET specification, assert it exists
    cy.wait(['@getSpecification']).then(() => {
      cy.contains('[data-cy=SpecificationJSON]', specificationString, { timeout: 2000 })
        .invoke('text')
        .then((text) => {
          // trim to remove the code formatted text, and the code line number "1"
          expect(text.trim().substring(1)).to.equal(specificationString);
        });
    });
  });
});

describe('E2E Test', () => {
  it('A failed specification update', () => {
    // navigate to specification page (via button)
    cy.contains('Specifications').click();
    // GET instrument list
    cy.intercept(
      {
        method: 'GET',
        url: '*/api/instrument/',
        hostname: 'localhost',
      },
      {
        statusCode: 200,
        body: { now: false, call: false, term: false },
      }
    );

    // GET instrument specification
    cy.intercept(
      {
        method: 'GET',
        url: '*/api/instrument/*/specification',
        hostname: 'localhost',
      },
      {
        statusCode: 200,
        body: { now: false, call: false, term: false },
      }
    ).as('getSpecification');

    cy.wait(['@getSpecification']).then(() => {
      cy.intercept(
        {
          method: 'PUT',
          url: '*/api/instrument/*/specification',
          hostname: 'localhost',
        },
        {
          statusCode: 501,
          body: JSON.stringify({ specification: { now: false, call: false, term: true } }),
        }
      ).as('failedPutSpecification');

      cy.contains('Submit')
        .click()
        .then(() => '@failedPutSpecification');
    });

    // wrapping alert to capture its value (before it vanishes)
    // https://www.stevenhicks.me/blog/2020/02/working-with-variables-in-cypress-tests/
    cy.get('[data-cy="ButtonAlert"]').then((buttonAlert) => {
      const alert = buttonAlert;
      cy.wrap(alert).as('alert');
    });

    cy.get('@alert').then((alert) => {
      expect(alert).to.contain('Specification update failed');
    });
  });
});

describe('E2E Test', () => {
  it('A successful specification update', () => {
    const specification = { now: false, call: false, term: false };
    const specificationString = JSON.stringify(specification);
    console.log(specificationString);
    // predefine GET and PUT Specification API calls to force stubbing of request
    // https://stackoverflow.com/a/68945338
    cy.intercept(
      {
        method: 'GET',
        url: '*/api/instrument/*/specification',
        hostname: 'localhost',
      },
      {
        statusCode: 200,
        body: specification,
      }
    ).as('getSpecification');

    // PUT API call
    cy.intercept('PUT', '*/api/instrument/*/specification', {}).as('putSpecification');
    cy.visit(Cypress.config('baseUrl') as string);
    cy.contains('Specifications').click();

    // GET instrument list
    cy.intercept(
      {
        method: 'GET',
        url: '/api/instrument/',
        hostname: 'localhost',
      },
      {
        statusCode: 200,
        body: specification,
      }
    );

    // GET specification, assert it exists
    cy.wait(['@getSpecification']).then(() => {
      cy.contains('[data-cy=SpecificationJSON]', specificationString, { timeout: 2000 })
        .invoke('text')
        .then((text) => {
          // the code formatted text contains line number and newlines
          expect(text.trim().substring(1)).to.equal(specificationString);
        });

      cy.contains('Submit').click();
      cy.wait(['@putSpecification'], { responseTimeout: 5000 });
    });

    // wrapping alert to capture its value (before it vanishes)
    // https://www.stevenhicks.me/blog/2020/02/working-with-variables-in-cypress-tests/
    cy.get('[data-cy="ButtonAlert"]').then((buttonAlert) => {
      const alert = buttonAlert;
      cy.wrap(alert).as('alert');
    });

    cy.get('@alert').then((alert) => {
      expect(alert).to.contain('Specification updated successfully');
    });
  });
});
