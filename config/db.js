import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`, `${process.env.DATABASE_USERNAME}`, `${process.env.DATABASE_PASSWORD}`,
    {
        host: `${process.env.DATABASE_HOST}`,
        dialect: "mysql",
        logging:false,
        pool: { max: 5, min: 0, idle: 10000 },
    });


export const DB = async () => {
    try {
        await sequelize.authenticate();
        console.log("db connected successfully!");

    } catch (error) {
        console.log("error in connecting to db", error);
    }
}


