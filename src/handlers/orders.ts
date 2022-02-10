import express from "express";
import {Order, OrderStore} from '../models/order'


const store = new OrderStore()
const index = async (req: express.Request, res: express.Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: express.Request, res: express.Response) => {
    const weapon = await store.show(req.params.id)
    res.json(weapon)
 }

 
 const create = async (req:express.Request, res: express.Response) => {
   
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