//importing third party framework to test my endpoints
import supertest from 'supertest';
import app from '../../server';
import { Weapon, MythicalWeaponStore } from "../../models/mythical_weapon";
import { User, UserAccount } from "../../models/user";
import client from '../../database'

const account = new UserAccount()
const weapon = new MythicalWeaponStore()

// creating a variable to inform supertest which endpoints to work on
const request = supertest(app);

describe('Testing my endpoint for orders responses', (): void => {
 it('checks the create order method endpoint fail as no authentication passed', async () => {
     await account.create({
        username: "hayah1999",
        password_digest: "hayah1999"
      });
   const response = await request.post('/orders')
   .send({
    status: "open",
    user_id: 1
})
  expect(response.status).toBe(401);
 });

 it('checks the index order method endpoint failed as no authentication passed', async () => {
   const response = await request.get('/orders')
  expect(response.status).toBe(401);
 });

 it('checks the show order method endpoint fail as no authentication passed', async () => {
  const response = await request.get('/orders/1')
 expect(response.status).toBe(401);
 });
 it('checks the add weapon method endpoint fail as no authentication passed', async () => {
    await weapon.create({
        name: 'AKM',
        type: 'assault rifle',
        weight: 252,
        price:10000
      });
   const response = await request.post('/orders/1/weapons')
   .send({
    weaponId: "1",
    quantity: 15
})
 const conn = await client.connect() 
const sql = 'DELETE FROM orders_weapons WHERE id=($1)' 
function result () { 
    conn.query(sql, [1])
}
result()
conn.release()
  expect(response.status).toBe(401);
 })
})
 