import axios from 'axios'
import dotenv from 'dotenv'; 
dotenv.config();

const URL = process.env.REACT_APP_API_LINK; 

export const getGames = async () => {
    try {
        const resp = await axios.get(`${URL}/`)
        return resp.data; 
    } catch (err) {
       console.log('Ocorreu um erro') 
    }
}

export const getGame = async(id) => {
    try {
        const resp = await axios.get(`${URL}/${id}`)
        return resp.data; 
    } catch (err) {
        console.log('Ocorreu um erro') 
    }
}

export const putGame = async(id, game) => {
    try {
        const resp = await axios.put(`${URL}/${id}`, {
            history: game.history, 
            xIsNext: game.xIsNext,
            stepNumber: game.stepNumber
        })
        return resp.data; 
    } catch (err) {
        console.log('Ocorreu um erro') 
    }
}

export const postGame = async(game) => {
    try {
        delete game.id;
        const resp = await axios.post(`${URL}/`, {
            history: game.history, 
            xIsNext: game.xIsNext,
            stepNumber: game.stepNumber
        })
        return resp.data; 
    } catch (err) {
        console.log('Ocorreu um erro'); 
    }
}