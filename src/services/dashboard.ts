import Client from '../database'

export class DashboardQueries {
  // Get all products that have been included in orders
  async weaponsInOrders(): Promise<{name: string, price: number, order_id: string}[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT name, price, order_id FROM mythical_weapons INNER JOIN orders_weapons ON mythical_weapons.id = orders_weapons.weapon_id'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }

  async usersWhoOrders(): Promise <{usename: string}[]> {
      try{
    const conn = await Client.connect()
    const sql = 'SELECT username FROM users INNER JOIN orders ON users.id = orders.user_id'
    const result = await conn.query(sql)
    conn.release()
    return result.rows
  } catch (error) {
    throw new Error(`unable get users: ${error}`)
  } 
  }
  async fiveExpensiveWeapons(): Promise <{name: string, type: string, weight: number, price: number|string}[]> {
    try{
  const conn = await Client.connect()
  const sql = 'SELECT * FROM mythical_weapons ORDER BY price DESC LIMIT 5'
  const result = await conn.query(sql)
  conn.release()
  return result.rows
} catch (error) {
  throw new Error(`unable get weapons: ${error}`)
} 
}
}
