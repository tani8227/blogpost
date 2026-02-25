import express from "express";
const port = 8000;
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes/index.js"
import { DB, sequelize } from './config/db.js';
import path from "node:path";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import ejsLayouts from "express-ejs-layouts";
import connectSessionSequelize from 'connect-session-sequelize';
import flash from "connect-flash";
import setFlash from "./middleware/setflashMesaage.js";


const __dirname = import.meta.dirname;

const app = express();
DB();


const sequelizeStore = new connectSessionSequelize(session.Store);

const sessionStore = new sequelizeStore(
    {
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 24 * 60 * 60 * 1000
    })


app.set("layout extractStyles", true)
app.set("layout extractScripts", true)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('assets'))

app.use(session(
    {
        secret: "blogpost",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 1000 * 60 },
        store: sessionStore
    }));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(setFlash)


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./assets'));
app.use(ejsLayouts);

app.use("/", routes);
app.listen(port, (err) => {
    if (err) {
        console.log("error in running the server : ", err);
    }
    console.log('server is running on port :', port);
})