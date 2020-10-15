import express from 'express';

const app = express();


app.post('/users', (req, res) => {
    return res.send({message: 'hello'});
})

app.listen(3333);