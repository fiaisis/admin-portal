describe('E2E Test', () => {
  it('Opens the root page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Specifications');
  });
});

describe('E2E Test', () => {
  it('Opens specification page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Specifications').click();
    cy.url().should('include', '/specification/MARI');
  });
});

describe('E2E Test', () => {
  it('Mocks valid load', () => {
    // a mock intercept for loading specifications
    cy.intercept(
      {
        method: 'GET',
        url: '/api/instrument/*',
        hostname: 'localhost',
      },
      {
        statusCode: 200,
        body: { now: false, call: false, term: false },
      }
    );
  });
});

// this test fails specification update
describe('E2E Test', () => {
  // const exampleJSON = require('../fixtures/example.json');

  it('A failed specification update', () => {
    // open admin-portal, navigate to specification page (via button)
    cy.visit('http://localhost:3000');
    cy.contains('Specifications').click();
    // get instrument list
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
    // get instrument spec
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
    ).as('getApi1');

    cy.wait(['@getApi1']);
    cy.contains('Submit').click();
    // PUT instrument spec (order before or after click doesn't matter)
    cy.intercept(
      {
        method: 'PUT',
        url: '/api/instrument/*',
        hostname: 'localhost',
      },
      {
          statusCode: 500,
  });
});
