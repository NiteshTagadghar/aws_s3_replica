import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises'

@Injectable()
export class CrudService {
    async uploadFileToBucket(file: Express.Multer.File, body){
        const fileName = `${Date.now()}-${file.originalname}`
        const path = `./buckets/${body.bucket_name_from_user}/${fileName}`
        await fs.mkdir(path, { recursive: true })
        return "File uploaded"
    }

    async getListOfObjects(bucketName){
        const path = `./buckets/${bucketName}`; // Replace with the actual path
        const files = await fs.readdir(path)

        return files
    }
}
