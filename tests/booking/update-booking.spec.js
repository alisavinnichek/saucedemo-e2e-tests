import { test, expect } from '@playwright/test';
import { BASE_URL, AUTH_DATA, BOOKING_DATA, UPDATED_BOOKING_DATA } from '../test-data.js';

test('Обновление бронирования (PUT)', async ({ request }) => {
    console.log('Запуск теста: Обновление бронирования');
  
    console.log('Получаем токен авторизации...');
    const authResponse = await request.post(`${BASE_URL}/auth`, {
        data: AUTH_DATA,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const authResponseBody = await authResponse.json();
    const authToken = authResponseBody.token;
    console.log(`Токен получен: ${authToken}`);

    console.log('Создаем тестовое бронирование...');
    const createResponse = await request.post(`${BASE_URL}/booking`, {
        data: BOOKING_DATA,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid;
    console.log(`Используем Booking ID: ${bookingId}`);

    console.log('Отправляем PUT запрос...');
    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        data: UPDATED_BOOKING_DATA,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${authToken}`
        }
    });

    console.log('Проверяем статус код...');
    const statusCode = response.status();
    console.log(`Статус код: ${statusCode}`);
    expect(statusCode).toBe(200);
    console.log('Статус код корректен (200)');

    console.log(' Получаем ответ...');
    const responseBody = await response.json();
    console.log('Ответ сервера:', JSON.stringify(responseBody, null, 2));

    console.log('Проверяем обновленные данные...');
    expect(responseBody.firstname).toBe(UPDATED_BOOKING_DATA.firstname);
    expect(responseBody.lastname).toBe(UPDATED_BOOKING_DATA.lastname);
    expect(responseBody.totalprice).toBe(UPDATED_BOOKING_DATA.totalprice);
    expect(responseBody.bookingdates.checkin).toBe(UPDATED_BOOKING_DATA.bookingdates.checkin);
    expect(responseBody.bookingdates.checkout).toBe(UPDATED_BOOKING_DATA.bookingdates.checkout);
    expect(responseBody.additionalneeds).toBe(UPDATED_BOOKING_DATA.additionalneeds);
    
    console.log('Данные успешно обновлены');
    console.log('Тест успешно пройден!');
});