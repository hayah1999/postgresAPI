//importing third party framework to test my endpoints
import supertest from 'supertest';
import app from '../../server';

// creating a variable to inform supertest which endpoints to work on
const request = supertest(app);

describe('Testing my endpoint for mythical_weapons responses', (): void => {
 it('checks the create weapoon method endpoint fail as no authentication passed', async () => {
   const response = await request.post('/mythical_weapons')
   .send({
    name: "Martian Grenade",
    type: "Grenades",
    weight: 95,
    price:3000
})
  expect(response.status).toBe(401);
 });

 it('checks the index weapon method endpoint', async () => {
   const response = await request.get('/mythical_weapons')
  expect(response.status).toBe(200);
 });

 it('checks the show weapon method endpoint', async () => {
  const response = await request.get('/mythical_weapons/1')
 expect(response.status).toBe(200);
 });
 it('checks the edit user method endpoint fail as no authentication passed', async () => {
   const response = await request.put('/mythical_weapons/1')
   .send({
    name : "M614",
    type : "Assult Riffle",
    weight: 270,
    price: 10000
})
  expect(response.status).toBe(401);
 })
 // as the token of authentication does not exist
 it('checks the delete method endpoint fail as no authentication passed', async () => {
   const response = await request.delete('/mythical_weapons/1')
  expect(response.status).toBe(401);
 })
})
 