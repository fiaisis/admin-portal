beforeEach(() => {
  // open admin-portal
  cy.visit('http://localhost:3000');
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
  it('A failed specification update', () => {
    // navigate to specification page (via button)
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
        body: { now: false, call: false, term: false },
      }
    );

    // GET instrument specification
    cy.intercept(
      {
        method: 'GET',
        url: '/api/instrument/*/specification',
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
          url: '/api/instrument/*/specification',
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
    // predefine GET and PUT Specification API calls to force stubbing of request
    // https://stackoverflow.com/a/68945338
    cy.intercept(
      {
        method: 'GET',
        url: '/api/instrument/*/specification',
        hostname: 'localhost',
      },
      {
        statusCode: 200,
        body: { now: false, call: false, term: false },
      }
    ).as('getSpecification');

    // PUT API call
    cy.intercept('PUT', '/api/instrument/*/specification', {}).as('putSpecification');

    cy.visit('http://localhost:3000');
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
        body: { now: false, call: false, term: false },
      }
    );

    cy.wait(['@getSpecification']).then(() => {
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
