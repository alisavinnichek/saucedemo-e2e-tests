import { test, expect } from '@playwright/test';
import { BASE_URL, BOOKING_DATA } from '../test-data.js';

test('Создание бронирования (POST)', async ({ request }) => {
    console.log('Запуск теста: Создание бронирования');
    
    console.log('Отправляем POST запрос на /booking...');
    const response = await request.post(`${BASE_URL}/booking`, {
        data: BOOKING_DATA,
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
    console.log('Ответ сервера:', JSON.stringify(responseBody, null, 2));

    console.log('Проверяем наличие bookingid...');
    expect(responseBody).toHaveProperty('bookingid');
    const bookingId = responseBody.bookingid;
    expect(bookingId).toBeGreaterThan(0);
    console.log(`Booking ID получен: ${bookingId}`);

    console.log('Проверяем данные бронирования...');
    expect(responseBody).toHaveProperty('booking');
    const booking = responseBody.booking;
   
    expect(booking.firstname).toBe(BOOKING_DATA.firstname);
    expect(booking.lastname).toBe(BOOKING_DATA.lastname);
    expect(booking.totalprice).toBe(BOOKING_DATA.totalprice);
    expect(booking.depositpaid).toBe(BOOKING_DATA.depositpaid);
    expect(booking.bookingdates.checkin).toBe(BOOKING_DATA.bookingdates.checkin);
    expect(booking.bookingdates.checkout).toBe(BOOKING_DATA.bookingdates.checkout);
    expect(booking.additionalneeds).toBe(BOOKING_DATA.additionalneeds);
    
    console.log('Все данные совпадают');
    console.log('Тест успешно пройден!');
});