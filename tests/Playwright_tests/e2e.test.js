const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3001'; // Application host (NOT service host - that can be anything)

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    allGames: '/data/games?sortBy=_createdOn%20desc',
    create: '/data/games',
    details: (id) => `/data/games/${id}`,
    delete: (id) => `/data/games/${id}`,
    comments: (id) => `/data/comments?where=gameId%3D%22${id}%22`,
    postComments: '/data/comments'
};

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    
    describe("authentication", () => {
        test("register does not work with empty fields", async () => {
            await page.goto(host);
            await page.click('text=Register');

            await page.click('[type="submit"]');

            //await page.on("dialog", dialog => dialog.accept());

            expect(page.url()).toBe(host + '/register');
        });

        test("register makes correct API call", async () => {
            await page.goto(host);
            await page.click('text=Register');

            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 1000);
            user.email = `abv_${random}@abv.bg`;
            
            
            await page.locator("#email").fill(user.email);
            await page.locator("#register-password").fill(user.password);
            await page.locator("#confirm-password").fill(user.confirmPass);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('[type="submit"]')
            ]);
            
            await expect(response.ok()).toBeTruthy();
            let userData = await response.json();

            expect(userData.email).toBe(user.email);
            expect(userData.password).toEqual(user.password);
        });

        test("login does not work with empty fields", async () => {
            await page.goto(host);
            await page.click('text=Login');

            await page.click('[type="submit"]');

            expect(page.url()).toBe(host + '/login');
        });

        test("login makes correct API call", async () => {
            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');
            
            
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/login") && response.status() === 200),
                page.click('[type="submit"]')
            ]);
            
            expect(response.ok()).toBeTruthy();
            let userData = await response.json();
            //console.log(userData);
            expect(userData.email).toBe(user.email);
            expect(userData.password).toEqual(user.password);
        });

        test('logout makes correct API call', async () => {
            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');
            
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            await page.click('[type="submit"]');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/logout") && response.status() === 204),
                page.locator('nav >> text=Logout').click()
            ]);
            expect(response.ok).toBeTruthy();
            await page.waitForSelector('nav >> text=Login');

            expect(page.url()).toBe(host + "/");
        });
    })

    describe("navbar", () => {
        test('logged user should see correct navigation', async () => {
            await page.goto(host);

            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            await page.click('[type="submit"]')

            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Game')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        });

        test('guest user should see correct navigation', async () => {
            await page.goto(host);

            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Game')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();
        });
    });

    describe("CRUD", () => {
        beforeEach(async () => {
            await page.goto(host);

            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            await page.click('[type="submit"]')
        });

        test('create does NOT work with empty fields', async () => {

            await page.click('text=Create Game');
            await page.waitForSelector('form');
            await page.click('[type="submit"]');

            expect(page.url()).toBe(host + '/create');
        });

        test('create makes correct API call for logged in user', async () => {
            await page.click('text=Create Game');
            await page.waitForSelector('form');

            await page.fill('[name="title"]', "Random title");
            await page.fill('[name="category"]', "Random category");
            await page.fill('[name="maxLevel"]', "12");
            await page.fill('[name="imageUrl"]', "https://jpeg.org/images/jpeg-home.jpg");
            await page.fill('[name="summary"]', "Random summary...");

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/games") && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            await expect(response.ok()).toBeTruthy();
            let gameData = await response.json();
            
            expect(gameData.title).toEqual('Random title');
            expect(gameData.category).toEqual('Random category');
            expect(gameData.maxLevel).toEqual('12');
            expect(gameData.summary).toEqual('Random summary...');
        });

        
        test('details show edit/delete buttons for owner', async () => {
            await page.goto(host + "/catalog");

            await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);

            await expect(page.locator('text="Delete"')).toBeVisible();
            await expect(page.locator('text="Edit"')).toBeVisible();
        });

        test('non-owner does NOT see delete and edit buttons', async () => {
            await page.goto(host + "/catalog");
            await page.click(`.allGames .allGames-info:has-text("MineCraft") >> .details-button`);

            await expect(page.locator('text="Delete"')).toBeHidden();
            await expect(page.locator('text="Edit"')).toBeHidden();
        });

        test('edit makes correct API call', async () => {
            await page.goto(host + "/catalog");

            await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);
            await page.click('text=Edit');

            await page.waitForSelector('form');

            await page.locator('[name="title"]').fill( 'Random title_edit');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/games") && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            let gameData = await response.json()
            
            expect(gameData.title).toEqual('Random title_edit');
            expect(gameData.category).toEqual('Random category');
            expect(gameData.maxLevel).toEqual('12');
            expect(gameData.summary).toEqual('Random summary...');
        });

        test('delete makes correct API call for owner', async () => {
            await page.goto(host + "/catalog");

            await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/games") && response.status() === 200),
                await page.click('text=Delete')
            ]);

            expect(response.ok()).toBeTruthy();
        });
    })

    describe('Home Page', () => {

        test('show home page', async () => {
            
            await page.goto(host);

            expect(page.locator('.welcome-message h2')).toHaveText("ALL new games are");
            expect(page.locator('.welcome-message h3')).toHaveText("Only in GamesPlay");
            expect(page.locator('#home-page h1')).toHaveText("Latest Games");
            
            const gameDivs = await page.locator('#home-page .game').all();
            
            expect(gameDivs.length).toBeGreaterThanOrEqual(3);
        });
    });
})
