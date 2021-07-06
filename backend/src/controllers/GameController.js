import express, { query } from 'express'; 
import mongoose from 'mongoose'

import GameModel from '../models/GameModel.js'

class GameController {
    async index(req, res){
        try {
            const all_games = await GameModel.find();   
            return res.status(200).json(all_games); 
        } catch (e) {
            return res.status(400).json({
                errors: e.errors
            });
        }
    }

    async store(req, res){
        try {
            const game = await GameModel.create(req.body); 
            const { id } = game; 
            res.status(200).json(id);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors
            });
        }
    }

    async show(req, res){
        const { id } = req.params; 
        try{
            if(!id){
                return res.status(400).json({
                    errors: [
                        "Missing ID"
                    ]
                }); 
            }


            const game = await GameModel.find({_id: id}); 

            if(!game){
                return res.status(400).json({
                    errors: [
                        "Game not found"
                    ]
                });
            }

            return res.status(200).json(game); 
        }catch (e) {
            return res.status(400).json({
                errors: e.errors
            });
        }
    }

    async update(req, res){
        const { id } = req.params; 
        try{
            if(!id){
                return res.status(400).json({
                    errors: [
                        "Missing ID"
                    ]
                }); 
            }


            const newgame = await GameModel.find({_id: id}).updateOne(req.body); 

            if(!newgame){
                return res.status(400).json({
                    errors: [
                        "Game not found"
                    ]
                });
            }

            return res.status(200).json(newgame); 
        }catch (e) {
            return res.status(400).json({
                errors: e.errors
            });
        }
    }


}

export default new GameController();