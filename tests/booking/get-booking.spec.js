import { test, expect } from '@playwright/test';
import { BASE_URL, BOOKING_DATA } from '../test-data.js';

test('Получение информации о бронировании (GET)', async ({ request }) => {
    console.log('Запуск теста: Получение бронирования');

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

    console.log('Отправляем GET запрос...');
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);

    console.log('Проверяем статус код...');
    const statusCode = response.status();
    console.log(`Статус код: ${statusCode}`);
    expect(statusCode).toBe(200);
    console.log('Статус код корректен (200)');

    console.log('Получаем ответ...');
    const responseBody = await response.json();
    console.log('Ответ сервера:', JSON.stringify(responseBody, null, 2));

    console.log('Проверяем соответствие данных...');
    expect(responseBody.firstname).toBe(BOOKING_DATA.firstname);
    expect(responseBody.lastname).toBe(BOOKING_DATA.lastname);
    expect(responseBody.totalprice).toBe(BOOKING_DATA.totalprice);
    expect(responseBody.depositpaid).toBe(BOOKING_DATA.depositpaid);
    expect(responseBody.bookingdates.checkin).toBe(BOOKING_DATA.bookingdates.checkin);
    expect(responseBody.bookingdates.checkout).toBe(BOOKING_DATA.bookingdates.checkout);
    expect(responseBody.additionalneeds).toBe(BOOKING_DATA.additionalneeds);
    
    console.log('Все данные совпадают');
    console.log('Тест успешно пройден!');
});