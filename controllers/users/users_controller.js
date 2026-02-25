
import db from "../../models/index.model.js";
const User = db.User;


export const signUp = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            req.flash("success", "invalid user credentials")
            return res.redirect('/api/user/signup');
        }
        if(!email.include('@gmail.com')&&password.length()<8)
            {
                console.loh('ghhghghghg')
                req.flash("success", "invalid user credentials");
                return res.redirect('/api/user/signup');
                  
            }
        const user = await User.findOne(
            {
                where:
                {
                    email: email,
                }
            })
        console.log(user);
        if (!user) {
            const newUser = await User.create({
                name: name,
                email: email,
                password: password,
            });
            if (newUser) {
                  req.flash('success', 'new user created successfully !!!')
                 return res.redirect('/api/user/sign_in')
                
            }
        } else {
            req.flash('success', 'Login successfully !!!')
            return res.redirect('/api/user/sign_in')
            }
        } catch (error) {
            
          req.flash('error', 'Error in sign up !!!')
            return res.redirect('/api/user/sign_up')
        }
    }
    
    
    export const signIn = async (req, res) => {
      
        req.flash('success', 'Login successfully !!!')
        return res.redirect('/');
}


export const logOut = async (req, res) => {

    console.log("logout hit !!!")
    req.logout(function (err){
        if (err) {
            req.flash('error', "error in logging out !!!");
            return res.redirect('back')
        }
    })
    req.flash('success', "Logout successfully !!!");
    return res.redirect('/')
}




export const getSignUp = async (req, res) => {
    try {

        return res.render('signup');
    } catch (error) {
        return res.render('404');
    }
}
export const getSignIn = async (req, res) => {
    try {

        return res.render('signin');
    } catch (error) {
        return res.render('404');
    }
}
