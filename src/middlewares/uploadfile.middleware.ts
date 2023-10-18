import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { Request } from "express";

const diskStorage: multer.StorageEngine = multer.diskStorage(
    { destination: function(req:Request,file,cb): void{
            cb(null,'./assets')
        },
        filename: function(req, file,cb): void {
            const ext: string = file.mimetype.split('/')[1];
            const filename: string = `${uuidv4()}.${ext}`;
            cb(null,filename)
        }
    })

export const uploadFile  =  multer({ storage: diskStorage }).single('image') ;
