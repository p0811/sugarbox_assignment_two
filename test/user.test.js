const request = require('supertest');
const app = require('../app')

test('user registration testing', async(done) => {
    await request(app).post('/sugerbox/user')
        .send({
            email: "piyush2234@gmail.com ",
            password: "7417199405",
            name: "Piyush test"
        })
        .expect(201)
})