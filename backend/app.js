import dotenv from 'dotenv'; 
import { resolve } from 'path'; 
dotenv.config(); 

import express from 'express'; 
import mongoose from './src/config/mongoose.js';
import cors from 'cors'; 

import gameRoutes from './src/routes/gameRoutes.js'

class App {
    constructor(){
        this.app = express();
        this.middlewares(); 
        this.routes();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: true}))
        this.app.use(express.json()); 
        this.app.use(cors());
    }

    routes(){
        this.app.use(
            '/', gameRoutes
        )
    }
}

export default new App().app;