//importing third party framework to test my endpoints
import supertest from 'supertest';
import app from '../../server';

// creating a variable to inform supertest which endpoints to work on
const request = supertest(app);

describe('Testing my endpoint for users responses', (): void => {
  
 it('checks the create user method endpoint', async () => {
   const response = await request.post('/users')
   .send({
       username: 'hayah1999',
       password: 'hayah1999'
   })
  expect(response.status).toBe(200);
 });

 it('checks the index user method endpoint', async () => {
   const response = await request.get('/users')
  expect(response.status).toBe(200);
 });
 it('checks the show weapon method endpoint', async () => {
  const response = await request.get('/users/1')
 expect(response.status).toBe(200);
 });

 it('checks the update user method endpoint fail as no authentication passed', async () => {
   const response = await request.put('/users/1')
   .send({
       username: 'hayah'
   })
  expect(response.status).toBe(401);
 })
 
})
describe('test the autentication', () => {
  it('checks authentication' , async () => {
    const response = await request.post('/users/authentication')
    .send({
      username: 'hayah1999',
      password: 'hayah1999'
    })
    expect(response.status).toBe(200);
  })
  // as the token of authentication does not exist
 it('checks the delete method endpoint fail as no authentication passed', async () => {
  const response = await request.delete('/users/1')
 expect(response.status).toBe(401);
})
})
