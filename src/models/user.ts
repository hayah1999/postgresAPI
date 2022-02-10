import dotenv from 'dotenv';
import client from '../database'
import bcrypt from 'bcrypt'


dotenv.config()

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export interface User {
    id?: number | string ;
    username: string;
    password_digest: string;
}


export class UserAccount {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get weapons: ${error}`)
        }
    }

async create(u: User): Promise<User> {
    try{
        const conn = await client.connect()
        const sql = 'INSERT INTO users (username,password_digest) VALUES($1,$2) RETURNING *'
        const hash = bcrypt.hashSync(
            u.password_digest + pepper,
            parseInt(saltRounds as string)
        );
        const result = await conn.query(sql, [u.username, hash])
        const user = result.rows[0]
        conn.release()
        return user
    }catch(err){
        throw new Error(`unable to create user (${u.username}): ${err}`)
    }
}
async delete(id: string): Promise<User | null> {
    try {
       const conn = await client.connect() 
       const sql = 'DELETE FROM users WHERE id=($1)' 
       const result = await conn.query(sql, [id])
       conn.release()
       if(result.rows.length) {
        return result.rows[0]
       }else{
         return null
       }
    } catch (error) {
        throw new Error(`can't find ${id}: ${error}`)
    }
}
async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'
    const result = await conn.query(sql, [username])

    console.log(password+pepper)
// to make sure that this username exist otherwise return null
    if(result.rows.length) {
        const user = result.rows[0]
        console.log(user)
        // compare password entered to the password_digest field found in the returned row.
        if(bcrypt.compareSync(password+pepper, user.password_digest)){
          return user  
        }
    }
    return null
}

async update(u: User): Promise<User> { 
    try{
        const conn = await client.connect() 
        // don't know how to do it need help!!!
        const sql = 'UPDATE users SET username = ($2) WHERE id = ($1)'
        const result = await conn .query(sql, [u.id, u.username])
        return result.rows[0] 
         conn.release() 
    }catch(err){
        throw new Error(`can't edit this user: ${err}`)
    }
}
}