const express = require('express');
const session = require('express-session');
const { Store } = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MONGO_URL = 'mongodb://127.0.0.1:27017/cookiesdb';

const app = express();
//manejo de objeto de la cuenta 
app.use(session({
    secret: 'secreto',
    resave: 'true',
    saveUninitialized: 'true',
    store: new MongoStore({
        url: MONGO_URL,
        autoReconnect: true
    })
}));
// enumera el numero de veces  que se actualiza las session
app.get('/', (req, res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    res.send(` Hi , numero de visitas: ${req.session.cuenta}`);

});

app.listen(3000, () => {
    console.log('server On');
});