import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("blogpost", "root", "root",
    {
        host: "localhost",
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


