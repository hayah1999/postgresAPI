import dotenv from 'dotenv'
import express  from "express";
import { User, UserAccount } from "../models/user";
import jwt from 'jsonwebtoken'


dotenv.config()

const account = new UserAccount()

const index = async (req: express.Request, res: express.Response) =>{
    const weapons = await account.index()
    res.json(weapons)
}

const create =  async (req: express.Request, res: express.Response) => {
    try {
        const user: User ={
            username: req.body.username,
            password_digest: req.body.password
        }

        const newAccount = await account.create(user)
        let token = jwt.sign({user: newAccount}, process.env.TOKEN_SECRET as string);
        //instead of returning the new user we will return the token so the user can store it and use it later for the requests in my api
        res.json(token)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}
// generate a token upon logging in
const authenticate = async (req: express.Request, res: express.Response) => {
    const user: User = {
        username: req.body.username ,
        password_digest: req.body.password 
      }
      try{
    const check = await account.authenticate(user.username, user.password_digest)
    if (check != null){
        let token = jwt.sign({user: {
            id: check.id,
            username: check.username,
            password_digest : check.password_digest
        }}, process.env.TOKEN_SECRET as string);
        res.json(token)
       
    }
      }catch(err){
          res.status(401)
          res.json(err)
      }
}
// only user can update his username 
const update = async (req: express.Request, res: express.Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password_digest: req.body.password,
    }
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = (jwt.decode(token) as jwt.JwtPayload).user.id 
        console.log(decoded)
        if(decoded !== user.id) {
            throw new Error('User id does not match!')
        }
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const updated = await account.update(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const deleted = await account.delete(req.params.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
 }

const users_routes = (app: express.Application) => {
    app.get('/users',index)
    app.post('/users', create)
    app.post('/users/authentication', authenticate)
    app.put('/users/:id', update)
    app.delete('/users/:id',  destroy)
}

export default users_routes