import { Weapon, MythicalWeaponStore } from "../mythical_weapon";


const store = new MythicalWeaponStore()

describe("mythical weapon model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
      });

    it("should test that index method returns a list of weapons", async () => {
      await store.delete("1");
      const result = await store.index();
        expect(result).toEqual([]);
    });

    it('create method should add a weapon', async () => {
        const result = await store.create({
          name: 'AKM',
          type: 'assault rifle',
          weight: 252,
          price:10000
        });
        expect(result.name).toEqual( 'AKM');
      });
    it('index method should return a list of weapons', async () => {
        const result = await store.index();
        expect(result).toEqual([{
          name: 'AKM',
          type: 'assault rifle',
          weight: 252,
          price:10000,
          id:2
        }]);
      });
    
    it('show method should return the correct weapon', async () => {
        const result = await store.show("2");
        expect(result).toEqual({
            name: 'AKM',
            type: 'assault rifle',
            weight: 252,
            price:10000,
            id: 2
        });
      });
    
   it('delete method should remove the weapon', async () => {
        await store.delete("2");
         const result = await store.index()
         expect(result).toEqual([]);
    });
});
