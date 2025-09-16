const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('Успешный логин', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await expect(page).toHaveURL(/.*inventory.html/);
});

test('Неуспешный логин с неверными данными', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login('invalid_user', 'wrong_password');
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
});