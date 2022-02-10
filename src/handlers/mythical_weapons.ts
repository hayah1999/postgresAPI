import dotenv from 'dotenv';
import express  from "express";
import jwt from "jsonwebtoken";
import { Weapon, MythicalWeaponStore } from "../models/mythical_weapon";


dotenv.config()

const store = new MythicalWeaponStore()

// this a handler for the index model method 
const index = async (req: express.Request, res: express.Response) =>{
    try {
        const weapons = await store.index()
         res.json(weapons)
    } catch (error) {
        res.status(400)
        res.json(`this request couldn't be sent : ${error}`)
    }
    
}

const show = async (req: express.Request, res: express.Response) => {
   try {
    const weapon = await store.show(req.params.id)
    res.json(weapon)
   } catch (error) {
    res.status(400)
    res.json(`this id isn't found: ${error}`) 
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

         const weapon: Weapon = {
            name: req.body.name ,
            type: req.body.type ,
            weight: req.body.weight,
            price: req.body.price
         }
        try{ 
         const newWeapon = await store.create(weapon)
         res.json(newWeapon)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }

 const edit = async (req:express.Request, res: express.Response) => {
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
        const weapon: Weapon = {
            id: req.params.id,
           name: req.body.name,
           type: req.body.type,
           weight: req.body.weight,
           price: req.body.price
        }

        const alteredWeapon = await store.edit(weapon)
        res.json(alteredWeapon)
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
        const deleted = await store.delete(req.params.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
 }
 
// route function that have an app instance of express that determine an endpoint for the method and call index to create the response
const mythical_weapons_route = (app: express.Application) => {
    app.get('/mythical_weapons',index)
    app.get('/mythical_weapons/:id', show)
    app.post('/mythical_weapons', create)
    app.put('/mythical_weapons/:id', edit)
    app.delete('/mythical_weapons/:id', destroy)
  
}
export default mythical_weapons_route;