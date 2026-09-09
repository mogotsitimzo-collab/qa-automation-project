import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Login functionality', () => {

    test('TC-001 - successful login', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/login');

        const loginPage = new LoginPage(page);

        await loginPage.login(
            'tomsmith',
            'SuperSecretPassword!'
        );

        await expect(page.locator('#flash')).toContainText(
            'You logged into a secure area!'
        );
    });


    test('TC-002 - login fails with incorrect password', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByLabel('Username').fill('tomsmith');

        await page.getByLabel('Password').fill('WrongPassword123');

        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.locator('#flash')).toContainText(
    'Your password is invalid!'
);
    });


    test('TC-003 - login fails with empty username', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByLabel('Password').fill('SuperSecretPassword!');

        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.locator('#flash')).toContainText(
            'Your username is invalid!'
        );
    });


    test('TC-004 - login fails with empty password', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByLabel('Username').fill('tomsmith');

        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.locator('#flash')).toContainText(
            'Your password is invalid!'
        );
    });


    test('TC-005 - login fails with both fields empty', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL(/login/);
    });

});