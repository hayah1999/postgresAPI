import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mythical_weapons_route from './handlers/mythical_weapons';
import users_routes from './handlers/users';
import orderRoutes from './handlers/orders';
import dashboardRoutes from './handlers/dashboards';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
    origin: 'http://somotherdomain.com',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req:express.Request, res: express.Response){
     res.send("Hello, world!")
})

mythical_weapons_route(app)
users_routes(app)
orderRoutes(app)
dashboardRoutes(app)

app.listen(3000, function(){
    console.log(`starting app on: ${address}`)
})

export default app;
/*_req is when the argument isn't used its indecating that it's unimportant (throw away argument)
app.get('/mythical_weapons', (_req: express.Request, res: express.Response) => {
    try{
        res.send('this is the INDEX route')
    }catch (err){
        res.status(400)
        res.json(err)
    }
})*/