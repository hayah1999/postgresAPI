import client from '../database'

export type Weapon = {
    id?: number | string ;
    name: string;
    type: string;
    weight: number;
    price: number | string;
}

export class MythicalWeaponStore {
    async index(): Promise<Weapon[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM mythical_weapons'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get weapons: ${error}`)
        }
    }
    //show a certain record
    async show(id: string): Promise<Weapon> {
        try {
           const conn = await client.connect() 
           const sql = 'SELECT * FROM mythical_weapons WHERE id=($1)' 
           const result = await conn.query(sql, [id])
           conn.release()
           return result.rows[0]
        } catch (error) {
            throw new Error(`can't find ${id}: ${error}`)
        }
    }
    // create model in the quiz
    async create(w: Weapon): Promise<Weapon> { 
        try{
            const conn = await client.connect() 
            const sql = 'INSERT INTO mythical_weapons (name, type, weight, price) VALUES($1, $2, $3, $4) RETURNING *'
            const result = await conn .query(sql, [w.name,w.type, w.weight, w.price])
             conn.release() 
             return result.rows[0] 
        }catch(err){
            throw new Error(`can't insert the row: ${err}`)
        }
    }
      // update model in the quiz
      async edit(w: Weapon): Promise<Weapon> { 
        try{
            const conn = await client.connect() 
            // don't know how to do it need help!!!
            const sql = 'UPDATE mythical_weapons SET name = ($2), type = ($3), weight =($4), price =($4) WHERE id = ($1)'
            const result = await conn .query(sql, [w.id, w.name, w.type, w.weight, w.price])
             conn.release() 
             return result.rows[0] 
        }catch(err){
            throw new Error(`can't insert the row: ${err}`)
        }
    }
    //delete model in the quiz
    async delete(id: string): Promise<Weapon> {
         try {
            const conn = await client.connect() 
            const sql = 'DELETE FROM mythical_weapons WHERE id=($1)' 
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
         } catch (error) {
             throw new Error(`can't find ${id}: ${error}`)
         }
    }
}