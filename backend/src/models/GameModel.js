import restful from 'node-restful';
const mongoose = restful.mongoose;

const GameSchema = new mongoose.Schema({
    history: {type: Array, required: true},
    xIsNext: {type: Boolean, required: true},
    stepNumber: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now()}
})

export default restful.model('Game', GameSchema);

