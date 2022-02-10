import { User, UserAccount } from "../user";

const account = new UserAccount()
//const bookStore = new BookStore()

describe("user model", () => {
    it("should have an index method", () => {
        expect(account.index).toBeDefined();
    });
      it('should have a create method', () => {
        expect(account.create).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(account.delete).toBeDefined();
      });

    it("should test that index method returns a list of users", async () => {
        await account.delete("1");
        await account.delete("2");
        await account.delete("3");

        const result = await account.index();
        expect(result).toEqual([]);
    });

    it('create method should add a user', async () => {
        const result = await account.create({
          username: "hayah1999",
          password_digest: "hayah1999"
        });
        expect(result.username).toEqual( 'hayah1999');
      });
    it('index method should return a list of users', async () => {
        const result = await account.index();
        expect(result[0].username).toEqual('hayah1999');
      });
        
   it('delete method should remove the user', async () => {
        await account.delete("4");
         const result = await account.index()
         expect(result).toEqual([]);
    });
});