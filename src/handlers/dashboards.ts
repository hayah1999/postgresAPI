import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'

const dashboard = new DashboardQueries()

const weaponsInOrders = async (_req: Request, res: Response) => {
  const weapons = await dashboard.weaponsInOrders()
  res.json(weapons)
}

const usersWhoOrders = async (_req: Request, res: Response) => {
    const weapons = await dashboard.usersWhoOrders()
    res.json(weapons)
  }
  const fiveExpensiveWeapons = async (_req: Request, res: Response) => {
    const weapons = await dashboard.fiveExpensiveWeapons()
    res.json(weapons)
  }

const dashboardRoutes = (app: express.Application) => {
    app.get('/weapons_in_orders', weaponsInOrders)
    app.get('/users_who_orders', usersWhoOrders)
    app.get('/five_expensive_weapons', fiveExpensiveWeapons)
}

export default dashboardRoutes