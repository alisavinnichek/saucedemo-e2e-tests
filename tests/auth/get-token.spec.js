import { test, expect } from '@playwright/test';
import { BASE_URL, AUTH_DATA } from '../test-data.js';

test('Получение токена авторизации', async ({ request }) => {
    console.log('Запуск теста: Получение токена авторизации');
 
    console.log('Отправляем POST запрос на /auth...');
    const response = await request.post(`${BASE_URL}/auth`, {
        data: AUTH_DATA,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log('Проверяем статус код...');
    const statusCode = response.status();
    console.log(`Статус код: ${statusCode}`);
    expect(statusCode).toBe(200);
    console.log('Статус код корректен (200)');

    console.log('Получаем ответ...');
    const responseBody = await response.json();
    console.log('Ответ сервера:', responseBody);

    console.log('Проверяем наличие токена...');
    expect(responseBody).toHaveProperty('token');
    const token = responseBody.token;
    expect(token).toBeTruthy();
    console.log(`Токен получен: ${token}`);

    expect(token.length).toBeGreaterThan(0);
    console.log('Токен валидный (не пустой)');

    console.log('Тест успешно пройден!');
});