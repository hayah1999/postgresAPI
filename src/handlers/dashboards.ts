import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'
import jwt from 'jsonwebtoken'

dotenv.config()

const dashboard = new DashboardQueries()

const weaponsInOrders = async (_req: Request, res: Response) => {
  try {
    const authorizationHeader = _req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
} catch(err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
}
  try {
    const weapons = await dashboard.weaponsInOrders()
    res.json(weapons)
  } catch (error) {
    res.status(400)
    res.json(`this request couldn't be sent : ${error}`)
  }
}

const usersWhoOrders = async (_req: Request, res: Response) => {
  try {
    const authorizationHeader = _req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
} catch(err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
}
  try {
    const weapons = await dashboard.usersWhoOrders()
    res.json(weapons)
  } catch (error) {
    res.status(400)
    res.json(`this request couldn't be sent : ${error}`)
  }
}
  const fiveExpensiveWeapons = async (_req: Request, res: Response) => {
    try {
      const authorizationHeader = _req.headers.authorization as string
      const token = authorizationHeader.split(' ')[1]
      jwt.verify(token, process.env.TOKEN_SECRET as string)
  } catch(err) {
      res.status(401)
      res.json('Access denied, invalid token')
      return
  }
    try {
      const weapons = await dashboard.fiveExpensiveWeapons()
    res.json(weapons)
    } catch (error) {
      res.status(400)
      res.json(`this request couldn't be sent : ${error}`)
    }    
}

const dashboardRoutes = (app: express.Application) => {
    app.get('/weapons_in_orders', weaponsInOrders)
    app.get('/users_who_orders', usersWhoOrders)
    app.get('/five_expensive_weapons', fiveExpensiveWeapons)
}

export default dashboardRoutes