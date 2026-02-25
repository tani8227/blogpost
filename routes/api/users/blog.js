import express from "express";
const blogRouter = express.Router();
import passport from '../../../config/passport.js'
import { upload } from "../../../middleware/multer.js";
import * as blogController from "../../../controllers/users/blog_controller.js"



blogRouter.get('/page', passport.checkAuthentication, blogController.blogPostPage);
blogRouter.get('/detail-page/:bid', passport.checkAuthentication, blogController.blogDetailsPage);
blogRouter.get('/my-blog', passport.checkAuthentication, blogController.myBlog);
blogRouter.post('/create', passport.checkAuthentication, upload.single("blog_img"), blogController.createBlog);
blogRouter.get('/delete_blog/:bid', passport.checkAuthentication,blogController.destroyBlog);
blogRouter.get('/edit-page/:bid', passport.checkAuthentication,blogController.blogEditPage);
blogRouter.post('/edit_blog/:bid', upload.single("blog_img"),  passport.checkAuthentication,blogController.editBlog);
blogRouter.post('/blog-category',  blogController.filterBlogByCategory);
blogRouter.post('/search',  blogController.searchBlogByQuery);
blogRouter.get("/partial-search", blogController.partialSearch);

export default blogRouter;