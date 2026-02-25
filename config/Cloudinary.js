import { v2 as Cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config();


Cloudinary.config(
    {
        cloud_name: `${process.env.Cloudinary_CLOUD_NAME}`,
        api_key: `${process.env.Cloudinary_API_KEY}`,
        api_secret: `${process.env.fOp9IIHTd9QuUj - JRE0OPimt8wg}`
    })

export default Cloudinary;