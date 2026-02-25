import db from "../../models/index.model.js";
import { uploadImg } from "../../middleware/uploadImage.js";
import { Op } from "sequelize";


const Blog = db.Blog;

export const createBlog = async (req, res) => {
   try {

      console.log("post blog:", req.body, req.file, req.user)

      const { title, author, category, description } = req.body;
      const img_uploaded = await uploadImg(req.file.path);
      if (req.user && img_uploaded) {
         console.log(img_uploaded);
         const blog = await Blog.create(
            {
               title: title,
               author: author,
               category: category,
               blog_img: img_uploaded,
               description: description,
               userId: req.user.id
            });
         req.flash('success', "Blog created successfully !!!")
         return res.redirect('/api/user/blog/page')
      }
   } catch (error) {
      req.flash('error', "Error in creating blog !!!")
      return res.redirect('/api/user/blog/page')
   }
}

export const blogPostPage = async (req, res) => {


   if (req.isAuthenticated()) {
      return res.render('blogPost')
   } else {
      return res.render('signin');
   }

}

export const myBlog = async (req, res) => {

   if (req.isAuthenticated()) {
      const blog = await Blog.findAll(
         {
            where:
            {
               userId: req.user.id
            }
         })
      if (blog) {
         return res.render('myBlogPost',
            {
               blogs: blog,
            })
      }
   }
   else {
      return res.render('signin');
   }

}

export const destroyBlog = async (req, res) => {

   const id = req.params.bid;
   if (req.isAuthenticated()) {
      const blog = await Blog.destroy(
         {
            where:
            {
               id: req.params.bid,
               userId: req.user.id
            }
         })
      if (blog) {
         req.flash("success", "Blog deleted successfully !!!");
         return res.redirect('/api/user/blog/my-blog')
      }
   }
   else {
      req.flash("error", "Error in deleted blog !!!");
      return res.redirect('/api/user/blog/my-blog');
   }
}



export const blogEditPage = async (req, res) => {

   const bid = req.params.bid;
   if (req.isAuthenticated()) {
      const blog = await Blog.findOne(
         {
            where:
            {
               id: bid,
            }
         })
      if (blog) {
         return res.render('editblogpage',
            {
               bid: bid,
               blog: blog
            })

      }
   } else {
      return res.render('signin');
   }

}


export const editBlog = async (req, res) => {


   try {

      // console.log("aya hai !!!:", req.body, req.file, req.params );
      const { title, author, category, description } = req.body;

      const updateData = {};

      if (title != undefined) {
         updateData.title = title;
      }
      if (author != undefined) {
         updateData.author = author;
      }
      if (category != undefined) {
         updateData.category = category;
      }
      if (description != undefined) {
         updateData.description = description;
      }
      if (req.file != undefined) {
         const update_img = await uploadImg(req.file.path);
         if (update_img) {
            updateData.blog_img = update_img;

         }
      }
      if (req.file == undefined) {
         const blog = await Blog.findOne(
            {
               where:
               {
                  id: req.params.bid,
               }
            })
         if (blog) {
            updateData.blog_img = blog.blog_img;
         }
      }

      if (req.isAuthenticated()) {
         const blog = await Blog.update(updateData,
            {
               where:
               {
                  id: req.params.bid,
                  userId: req.user.id
               }
            })
         if (blog) {
            req.flash("success", "Blog updated successfully !!!");
            return res.redirect('/api/user/blog/my-blog')
         }
      }
      else {
         req.flash("error", "user not authenticated !!!");
         return res.redirect('/api/user/blog/my-blog');
      }
   } catch (error) {
      req.flash("error", "Error in updating blog !!!");
      return res.redirect('/api/user/blog/my-blog');
   }
}


export const blogDetailsPage = async (req, res) => {

   const bid = req.params.bid;
   if (req.isAuthenticated()) {

      const blog = await Blog.findOne(
         {
            where:
            {
               id: bid,
            }
         })
      if (blog) {
         return res.render('blogDetailsPage',
            {
               blog: blog
            })
      }
   } else {
      return res.render('signin');
   }
}


export const filterBlogByCategory = async (req, res) => {
   try {
      const { category } = req.body;
      console.log(category);
      const filterBlogs = await Blog.findAll(
         {
            where:
            {
               category: category
            }
         });
      if (filterBlogs.length > 0) {
         return res.render('home',
            {
               allBlog: filterBlogs,
               category: category
            })
      } else {
         const allBlog = await Blog.findAll({});
         if (allBlog) {
            return res.render('home',
               {
                  allBlog: allBlog,
                  category: category
               })
         }
      }
   } catch (error) {
      return res.redirect('/');

   }
}

export const searchBlogByQuery = async (req, res) => {
   try {

      const { search, category } = req.body;
      // console.log("c:",category)
      // console.log(search)
      if (category) {

         const filterBlogs = await Blog.findAll(
            {
               where:
               {
                  title: search,
                  category: category
               }
            })
         // console.log("filter : ",filterBlogs)
         if (filterBlogs) {
            return res.render('home',
               {
                  allBlog: filterBlogs,
                  category: category,
                  search: search
               })
         }
      } else {
         const filterBlogs = await Blog.findAll(
            {
               where:
               {
                  [Op.or]: [{ title: search }, { author: search }]

               }
            })
         // console.log("filter : ",filterBlogs)
         if (filterBlogs) {
            return res.render('home',
               {
                  allBlog: filterBlogs,
                  category: category,
                  search: search
               })
         }
      }
      return res.redirect('/')

   } catch (error) {
      return res.redirect('/');

   }
}


export const partialSearch = async (req, res) => {
   try {
      const { q } = req.query;
      console.log(q);
      const blogs = await Blog.findAll(
         {
            where:
            {
               title: { [Op.like]: `%${q}%` }
            }
         })
      if (blogs) {
            // console.log("===>", blogs);
            return res.json(blogs);
      }
   } catch (error) {
      return res.redirect('/');
   }
}