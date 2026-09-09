import { defineConfig } from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    use: {

        browserName: 'chromium',

        channel: 'chrome',

        headless: false,

        launchOptions: {
            slowMo: 500
        }

    }

});