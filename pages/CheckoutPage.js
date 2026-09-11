export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = this.page.locator('#first-name');
        this.lastNameInput = this.page.locator('#last-name');
        this.postalCodeInput = this.page.locator('#postal-code');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
    }


}
