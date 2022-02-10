import { DashboardQueries } from "../dashboard";

const view = new DashboardQueries()

describe("Dashboard service tests", () => {
    it("should test weaponInOrders returns a list of weapons in order", async () => {
        const result =  view.weaponsInOrders;
          expect(result).toBeDefined();
      });
      it("should test usersWhoOrders returns a list of users who made orders", async () => {
        const result =  view.usersWhoOrders;
          expect(result).toBeDefined()
      });
      it("should test fiveExpensiveWeapons returns a list of the 5 most expensive weapons", async () => {
        const result =  view.fiveExpensiveWeapons;
          expect(result).toBeDefined();
      });
})