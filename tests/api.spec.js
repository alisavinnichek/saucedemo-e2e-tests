// tests/api.spec.js
import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

test('Создание бронирования (POST)', async ({ request }) => {
  console.log('🎯 Запуск теста: Создание бронирования');
  
  const bookingData = {
    firstname: "Иван",
    lastname: "Петров",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2024-01-05"
    },
    additionalneeds: "Завтрак"
  };

  console.log('📤 Отправляем POST запрос...');
  const response = await request.post(`${baseURL}/booking`, {
    data: bookingData,
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
  console.log(`Booking ID получен: ${bookingId}`);

  console.log('Проверяем соответствие данных...');
  expect(responseBody.booking.firstname).toBe(bookingData.firstname);
  expect(responseBody.booking.lastname).toBe(bookingData.lastname);
  expect(responseBody.booking.totalprice).toBe(bookingData.totalprice);
  console.log('Все данные совпадают');

  console.log('Тест успешно пройден!');
  return bookingId; 
});