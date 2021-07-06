import app from './app.js';
import mongoose from './src/config/mongoose.js';

const port = 3590; 

const context = this; 

mongoose.connect(process.env.CONNECTIONSTRING, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(()=>{
            app.emit('Mongoose Connected');
        })
        .catch(e => console.log(e)); 
app.on('Mongoose Connected', ()=>{
    app.listen(port, ()=>{
        console.log(`Listening at port ${port}`); 
    })
})
