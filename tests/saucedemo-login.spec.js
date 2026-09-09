import {test, expect} from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/SauceDemoLoginPage.js';


test('TC-001 - successful SauceDemo login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('TC-002 - login with invalid password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('TC-003 - login with empty username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});

test('TC-004 - login with empty password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    await page.locator('#user-name').fill('standard_user');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
} );

test('TC-005 - both fields empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); 
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});