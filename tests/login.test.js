const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('Проверка работы LoginPage', async ({ page }) => {
    console.log('Начинаем тест LoginPage...');
    
    // Создаем экземпляр LoginPage
    const loginPage = new LoginPage(page);
    
    // Открываем страницу
    await loginPage.open();
    console.log('Страница открыта');
    
    // Проверяем что элементы есть на странице
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    console.log('Все элементы найдены');
    
    // Заполняем форму
    await loginPage.usernameInput.fill('standard_user');
    await loginPage.passwordInput.fill('secret_sauce');
    console.log('Форма заполнена');
    
    // Нажимаем кнопку
    await loginPage.loginButton.click();
    console.log('Кнопка нажата');
    
    // Проверяем что перешли на нужную страницу
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
    
    console.log('LoginPage работает!');
});