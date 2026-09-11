import {test, expect} from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/SauceDemoLoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test('TC-006 - verify product page title', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await expect(productsPage.pageTitle).toHaveText('Products');
})

test('TC-007 - verify products are displayed', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    const productCount = await productsPage.products.count();
    expect(productCount).toBeGreaterThan(0);
})

test('TC-008 - verify product names, prices, and images', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    const productsNames = await productsPage.productsNames.allTextContents();
    const productsPrices = await productsPage.productsPrices.allTextContents();
    const productsImagesCount = await productsPage.productsImages.count();
    expect (productsNames).not.toHaveLength(0);
    expect (productsPrices).not.toHaveLength(0);
    expect (productsImagesCount).toBeGreaterThan(0);

})

test('TC-009 - display multiple products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    const productCount = await productsPage.products.count();
    expect(productCount).toBeGreaterThan(1);
});

test('TC-010 - verify add to cart button functionality', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartButton.first().click();
    await expect(productsPage.cartBadge).toHaveText('1');
});

test('TC-011 - verify correct product appears in cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    const productName = await productsPage.productsNames.first().textContent();
    await productsPage.addToCartButton.first().click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    const cartProductName = await cartPage.productName.first().textContent();
    expect(cartProductName).toBe(productName);
    await expect(cartPage.productName.first()).toBeVisible();
});

test('TC-012 - verify product quantity in cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartButton.first().click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    const productQuantity = await cartPage.productQuantity.first().textContent();
    expect(productQuantity).toBe('1');
});

test('TC-013 - verify remove button functionality', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartButton.first().click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    await cartPage.removeButton.first().click();
    await expect(cartPage.productQuantity.first()).not.toBeVisible();
});

test('TC-014 - verify cart badge updates after removing product', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartButton.first().click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    await cartPage.removeButton.first().click();
    await expect(productsPage.cartBadge).not.toBeVisible();
}); 

test('TC-015 - verify continue shopping button functionality', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const loginPage = new SauceDemoLoginPage(page);

    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);

    await productsPage.addToCartButton.first().click();

    await productsPage.cartButton.click();

    const cartPage = new CartPage(page);

    await cartPage.continueShoppingButton.click();

    await expect(productsPage.pageTitle).toBeVisible();

});

test('TC-016 - verify checkout button functionality', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartButton.first().click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    await cartPage.checkoutButton.click();
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
    await expect(checkoutPage.continueButton).toBeVisible();
    await checkoutPage.firstNameInput.fill('Tshiamo');
    await checkoutPage.lastNameInput.fill('Mogotsi');
    await checkoutPage.postalCodeInput.fill('1540');
    await checkoutPage.continueButton.click();
    });

    test ('TC-017 - verify first name input', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartButton.first().click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    await cartPage.checkoutButton.click();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.lastNameInput.fill('Mogotsi');
    await checkoutPage.postalCodeInput.fill('1540');
    await checkoutPage.continueButton.click();
    await expect(page.getByText('Error: First Name is required')).toBeVisible();    
    });

    test ('TC-018 - verify last name input', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartButton.first().click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    await cartPage.checkoutButton.click();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.firstNameInput.fill('Tshiamo');
    await checkoutPage.postalCodeInput.fill('1540');
    await checkoutPage.continueButton.click();
    await expect(page.getByText('Error: Last Name is required')).toBeVisible();
    });

    test ('TC-019 - verify postal code input', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartButton.first().click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    await cartPage.checkoutButton.click();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.firstNameInput.fill('Tshiamo');
    await checkoutPage.lastNameInput.fill('Mogotsi');
    await checkoutPage.continueButton.click();
    await expect(page.getByText('Error: Postal Code is required')).toBeVisible();
    });

    test('TC-020 - verify checkout process', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const loginPage = new SauceDemoLoginPage(page);

    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);

    const productName = await productsPage.productsNames.first().textContent();

    await productsPage.addToCartButton.first().click();

    await productsPage.cartButton.click();

    const cartPage = new CartPage(page);

    await cartPage.checkoutButton.click();

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.firstNameInput.fill('Tshiamo');

    await checkoutPage.lastNameInput.fill('Mogotsi');

    await checkoutPage.postalCodeInput.fill('1540');

    await checkoutPage.continueButton.click();

    await expect(page.getByText('Checkout: Overview')).toBeVisible();

    await expect(page.getByText(productName)).toBeVisible();

});

test('TC-021 - verify finish button functionality', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartButton.first().click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    await cartPage.checkoutButton.click();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.firstNameInput.fill('Tshiamo');
    await checkoutPage.lastNameInput.fill('Mogotsi');
    await checkoutPage.postalCodeInput.fill('1540');
    await checkoutPage.continueButton.click();
    await checkoutPage.finishButton.click();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
});
