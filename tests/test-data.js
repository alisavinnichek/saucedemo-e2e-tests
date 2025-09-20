export const BASE_URL = 'https://restful-booker.herokuapp.com';
export const AUTH_DATA = {
    username: "admin",
    password: "password123"
};

export const BOOKING_DATA = {
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

export const UPDATED_BOOKING_DATA = {
    firstname: "Сергей",
    lastname: "Петров",
    totalprice: 200,
    depositpaid: true,
    bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-07"
    },
    additionalneeds: "Завтрак и ужин"
};