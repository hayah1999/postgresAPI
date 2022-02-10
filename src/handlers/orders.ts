import dotenv from 'dotenv'
import express from "express";
import {Order, OrderStore} from '../models/order'
import jwt from 'jsonwebtoken'

dotenv.config()

const store = new OrderStore()
const index = async (req: express.Request, res: express.Response) => {
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
        const orders = await store.index()
        res.json(orders) 
    } catch (error) {
        res.status(400)
        res.json(`this request couldn't be sent : ${error}`)
    }
}

const show = async (req: express.Request, res: express.Response) => {
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
        const weapon = await store.show(req.params.id)
        res.json(weapon)
    } catch (error) {
        res.status(400)
        res.json(`this id could not be found: ${error}`) 
    }    
}

 
 const create = async (req:express.Request, res: express.Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    const order: Order = {
        status: req.body.status,
        user_id: req.body.userid
    }
        try{ 
         const newOrder = await store.create(order)
         res.json(newOrder)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }
 const addWeapon = async (req: express.Request, res: express.Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

     const orderId: string = req.params.id;
     const weaponId: string = req.body.weaponId;
     const quantity: number = req.body.quantity;
     try {
         const addedWeapon = await store.addWeapon(quantity, orderId, weaponId)
         res.json(addedWeapon)
     } catch (error) {
         res.status(400)
         res.json(error)
     }
 }
const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    //the route get the orders table then the id of the order as i'm adding product to it 
    app.post('/orders/:id/weapons', addWeapon)
}
export default orderRoutes