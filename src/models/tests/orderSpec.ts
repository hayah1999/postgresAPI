import {Order, OrderStore} from '../order'
import { User, UserAccount } from "../user";

const store = new OrderStore()
const account = new UserAccount()

describe("order model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });

      it('should have an add weapon method', () => {
        expect(store.addWeapon).toBeDefined();
      });

      it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
      });

    it("should test that index method returns a list of orders", async () => {
      const result = await store.index();
        expect(result).toEqual([]);
    });

    it('create method should add an order', async () => {
        await account.create({
          username: "hayah1999",
          password_digest: "hayah1999"
        });
        const result = await store.create({
          status: "open",
          user_id: 2
        });
        expect(result.status).toEqual( 'open');
      });
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
          id: 1,
          status: 'open',
          user_id:2
        }]);
      });
    
    it('show method should return the correct order', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
          status: 'open',
          user_id:2
        });
      });
/*
    it('add weapon method should add the weapon to the orders_weapons table', async () => {
        const result = await store.addWeapon(20, "1", "1");
        expect(result).toEqual({    
        id: 1,
        quantity: 20,
        order_id: "1",
        weapon_id: "1"
        });
      });
*/
   it('delete method should remove the order', async () => {
        await store.delete("1");
         const result = await store.index()
         expect(result).toEqual([]);
    });
});