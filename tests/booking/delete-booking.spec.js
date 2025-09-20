test('Удаление бронирования (DELETE)', async ({ request }) => {
  console.log('Запуск теста: Удаление бронирования');
  
  console.log('Получаем токен авторизации...');
  const authData = {
    username: "admin",
    password: "password123"
  };

  const authResponse = await request.post(`${baseURL}/auth`, {
    data: authData,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const authResponseBody = await authResponse.json();
  const authToken = authResponseBody.token;
  console.log(`Токен получен: ${authToken}`);

  console.log('Создаем тестовое бронирование...');
  const bookingData = {
    firstname: "Алексей",
    lastname: "Кузнецов",
    totalprice: 300,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-04-01",
      checkout: "2024-04-10"
    },
    additionalneeds: "Все включено"
  };

  const createResponse = await request.post(`${baseURL}/booking`, {
    data: bookingData,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const createResponseBody = await createResponse.json();
  const bookingId = createResponseBody.bookingid;
  console.log(`Используем Booking ID: ${bookingId}`);

  console.log('Проверяем существование бронирования...');
  const getResponseBefore = await request.get(`${baseURL}/booking/${bookingId}`);
  expect(getResponseBefore.status()).toBe(200);
  console.log('Бронирование существует');

  console.log('Отправляем DELETE запрос...');
  const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${authToken}`
    }
  });

  console.log(' Проверяем статус код...');
  const statusCode = response.status();
  console.log(`Статус код: ${statusCode}`);
  expect(statusCode).toBe(201);
  console.log('Статус код корректен (201)');

  console.log('Проверяем что бронирование удалено...');
  const getResponseAfter = await request.get(`${baseURL}/booking/${bookingId}`);
  expect(getResponseAfter.status()).toBe(404);
  console.log('Бронирование успешно удалено (404 Not Found)');
  console.log('ест успешно пройден!');
});