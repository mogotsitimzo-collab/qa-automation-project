export class CartPage {
    constructor(page) {
        this.page = page;
        this.productName = this.page.locator('.inventory_item_name');
        this.productQuantity = this.page.locator('.cart_quantity');
        this.removeButton = this.page.getByRole('button', { name: 'Remove' });
        this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    }
}