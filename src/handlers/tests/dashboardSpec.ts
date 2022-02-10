//importing third party framework to test my endpoints
import supertest from 'supertest';
import app from '../../server';

// creating a variable to inform supertest which endpoints to work on
const request = supertest(app);

describe('Testing my endpoint for Dashboard responses', (): void => {
 it('checks the weapons in the orders endpoint', async () => {
   const response = await request.get('/weapons_in_orders')
  expect(response.status).toBe(200);
 });

 it('checks the users who made orders endpoint', async () => {
   const response = await request.get('/users_who_orders')
  expect(response.status).toBe(200);
 });

 it('checks the show 5 most expensive weapon endpoint', async () => {
  const response = await request.get('/five_expensive_weapons')
 expect(response.status).toBe(200);
 });
})