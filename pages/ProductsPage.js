export class ProductsPage {
    constructor(page) {
        this.page = page;
    
    this.pageTitle = this.page.getByText('Products');
    this.products = this.page.locator('.inventory_item');
    this.productsNames = this.page.locator('.inventory_item_name');
    this.productsPrices = this.page.locator('.inventory_item_price');
    this.productsImages = this.page.locator('.inventory_item_img');
    this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
this.cartBadge = this.page.locator('.shopping_cart_badge');
this.cartButton = this.page.locator('.shopping_cart_link');
this.productQuantity = this.page.locator('.cart_quantity');
this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
}

} 

