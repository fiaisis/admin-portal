beforeEach(() => {
  // open admin-portal
  const URL = Cypress.config('baseUrl') as string;
  cy.visit(URL);
});

describe('E2E Test', () => {
  it('A successful specification update', () => {
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
        body: { now: false, call: false, term: false },
      }
    ).as('getSpecification');

    // PUT API call
    cy.intercept('PUT', '*/api/instrument/*/specification', {}).as('putSpecification');
    cy.visit('http://localhost:3000/admin-portal');
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

    cy.wait(['@getSpecification']).then(() => {
      cy.get('[data-cy=SpecificationJSON]')
        .then((SpecificationJSON) => {
          alert(SpecificationJSON);
          console.log(SpecificationJSON);
        })
        .should('contain.text');
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
