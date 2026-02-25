import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../models/index.model.js";

const User = db.User;

passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passReqToCallback: true,
    },
    async function (req, email, password, done) {
        if (!email.includes('@gmail.com')) {

            req.flash("error", "wrong email format");
            return done(null, false);

        }
        if (password.length < 0)
            {
                
            req.flash("error", "wrong password format");
            return done(null, false);

        }
        const user = await User.findOne(
            {
                where:
                {
                    email: req.body.email
                }
            });
        if (!user) {
            req.flash('error', 'user not found')
            return done(null, false);
        } else {
            if (email != user.email || password != user.password) {
                req.flash('error', 'email or password incorrect !!!')
                return done(null, false);
            } else {

                return done(null, user)
            }
        }
    }
));

passport.serializeUser(function (user, done) {
    return done(null, user.id);
})

passport.deserializeUser(async function (id, done) {
    const user = await User.findOne(
        {
            where:
            {
                id: id
            }
        })
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
})

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'Unauthenticated user login here !!!')
        return res.redirect('/api/user/sign_in')
    }
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}


export default passport;

