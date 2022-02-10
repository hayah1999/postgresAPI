import client from '../database'

export type Order = {
    id?: number | string ;
    status: string;
    user_id: number | string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get orders: ${error}`)
        }
    }
    //show a certain record
    async show(id: string): Promise<Order> {
        try {
           const conn = await client.connect() 
           const sql = 'SELECT * FROM orders WHERE id=($1)' 
           const result = await conn.query(sql, [id])
           conn.release()
           return result.rows[0]
        } catch (error) {
            throw new Error(`can't find ${id}: ${error}`)
        }
    }
    // create model in the quiz
    async create(o: Order): Promise<Order> { 
        try{
            const conn = await client.connect() 
            const sql = 'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *'
            const result = await conn.query(sql, [o.status, o.user_id])
             conn.release() 
             return result.rows[0] 
        }catch(err){
            throw new Error(`can't insert the row: ${err}`)
        }
    }
     async addWeapon (quantity: number, orderId: string, weaponId: string): Promise<Order> {

        // get order to see if it is open
    try {
        const ordersql = 'SELECT * FROM orders WHERE id=($1)'

        const conn = await client.connect()
        const result = await conn.query(ordersql, [orderId])
        const order = result.rows[0]
  
        if (order.status !== "open") {
            
          throw new Error(`Could not add product ${weaponId} to order ${orderId} because order status is ${order.status}`)
        }
  
        conn.release()
      } catch (err) {
        throw new Error(`${err}`)
      }
  
         try {
             const conn = await client.connect() 
             const sql = 'INSERT INTO orders_weapons (quantity, order_id, weapon_id) VALUES ($1, $2, $3) RETURNING *'
             const result = await conn.query(sql, [quantity, orderId, weaponId])
             conn.release()
             return result.rows[0]
         } catch (error) {
             throw new Error(`can't add weapon ${weaponId} to order ${orderId}: ${error}`)
         }
     }
    //delete model in the quiz
    async delete(id: string): Promise<Order> {
         try {
            const conn = await client.connect() 
            const sql = 'DELETE FROM orders WHERE id=($1)' 
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
         } catch (error) {
             throw new Error(`can't find ${id}: ${error}`)
         }
    }
}