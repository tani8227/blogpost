import db from "../models/index.model.js"

const Blog = db.Blog;



export const home = async (req, res) => {
    try {
         
        const allBlog= await Blog.findAll({});
        if(allBlog)
            {
                return res.render("home",
                    {
                        allBlog,
                        category:""
                    })
            }

    } catch (error) {

        return res.render("404",
            {
                tittle: "home page"
            });
    }
} 