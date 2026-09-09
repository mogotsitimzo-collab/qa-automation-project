export class LoginPage {

    constructor(page) {
        this.page = page;

        this.username = page.getByLabel('Username');
        this.password = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(username, password) {

        await this.username.fill(username);

        await this.password.fill(password);

        await this.loginButton.click();
    }
}