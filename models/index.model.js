import { sequelize } from "../config/db.js";
import User from "./user.model.js";
import Blog from "./blog.model.js";

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Blog = Blog;



// model mapping 
db.User.hasMany(db.Blog, { foreignKey: 'userId' });
db.Blog.belongsTo(db.User, { foreignKey: 'userId' });




db.sequelize.sync().then(() => { console.log("re-sync") })


export default db;
