// This file tests the cypress library is working correctly
describe('Cypress Test', () => {
  it('Tests cypress passes correctly', () => {
    expect(true).to.equal(true);
  });
});

describe('Cypress Test', () => {
  it('Tests cypress fails correctly', () => {
    cy.on('fail', (err) => {
      cy.log(err.message);
      return true;
    });
    expect(true).to.equal(false);
  });
});
