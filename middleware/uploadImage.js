import Cloudinary from "../config/Cloudinary.js";
import fs from "node:fs"


export const uploadImg = async function (filePath) {
    try {
        console.log(filePath);
        const result = await Cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return {
            url: result.secure_url,
            publicId: result.public_id,
        };

    } catch (error) {
        throw new Error("Cloudinary upload failed: ", error.message);
    }
}