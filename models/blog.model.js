import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


  const Blog =  sequelize.define('Blog',
    {
        title:
        {
            type:DataTypes.STRING,
            allowNull:false,
        },
        author:
        {
            type:DataTypes.STRING,
            allowNull:false,
        },
        category:
        {
             type:DataTypes.STRING,
             allowNull:false,
        },
        blog_img:
        {
          type:DataTypes.JSON,
          allowNull:false,
        },
        description:
        {
            type:DataTypes.STRING,
            allowNull:false,
        },
        userId:
        {
            type:DataTypes.INTEGER,
            allowNull:false,
        }  
    },{timestamps:true,});

    export default Blog;