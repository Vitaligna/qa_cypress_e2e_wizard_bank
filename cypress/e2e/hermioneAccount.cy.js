describe('Wizard Bank - Hermione Granger Account Tests', () => {
  beforeEach(() => {
    cy.visit(
      'https://www.globalsqa.com/angularJs-test-project/xmlHttp/index.php'
    );
  });

  it('should complete the full banking workflow for Hermione Granger', () => {
    cy.contains('Customer Login').click();
    cy.get('#userSelect').select('Hermione Granger');
    cy.get('button[type="submit"]').click();

    cy.get('.borderM > :nth-child(3) > :nth-child(1)').should(
      'contain',
      '1001'
    );
    cy.get('.borderM > :nth-child(3) > :nth-child(2)').as('balance');
    cy.get('.borderM > :nth-child(3) > :nth-child(3)').should(
      'contain',
      'Dollar'
    );

    const depositAmount = '500';
    cy.contains('Deposit').click();
    cy.get('input[placeholder="amount"]').type(depositAmount);
    cy.get('form.ng-dirty > .btn').click();

    cy.get('.error').should('have.text', 'Deposit Successful');
    cy.get('@balance').should('contain', depositAmount);

    const withdrawAmount = '200';
    const expectedFinalBalance = '300';
    cy.contains('Withdrawl').click();

    cy.get('input[placeholder="amount"]').type(withdrawAmount);
    cy.get('form.ng-dirty > .btn').click();

    cy.get('.error').should('have.text', 'Transaction successful');
    cy.get('@balance').should('contain', expectedFinalBalance);

    cy.contains('Transactions').click();

    cy.get('#anchor0')
      .should('contain', depositAmount)
      .and('contain', 'Credit');
    cy.get('#anchor1')
      .should('contain', withdrawAmount)
      .and('contain', 'Debit');

    cy.contains('Back').click();
    cy.get('#accountSelect').select('1002');

    cy.contains('Transactions').click();
    cy.get('tbody tr').should('not.exist');

    cy.contains('Back').click();
    cy.contains('Logout').click();

    cy.get('#userSelect').should('be.visible');
  });
});
