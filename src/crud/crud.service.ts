import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises'
import * as path from 'path';

@Injectable()
export class CrudService {
    async uploadFileToBucket(file, body){
        console.log("fileDetails", file)
        //create a folder if not exist 
        const userDefinedBucket = `./buckets/${body.bucket_name_from_user}`
        /**
         *
         * if we add recrusive : true
         *  for eg:: /buckets/names/actors/
         *      let say names and actors folder are not present 
         *      it will create both folders
         */
        
        await fs.mkdir(userDefinedBucket, { recursive: true }) 
        
        //create full file path along with user defined bucket name 
        const fileName = `${Date.now()}-${file.originalname}`
        const filePath = `buckets/${body.bucket_name_from_user}/${fileName}`
        
        /**
         * 
         * process.cwd() current working directory eg:: /Users/Nitesh/Desktop/repo/aws_s3_replica
         * eg :: of fullFilePath :: /Users/Nitesh/Desktop/repo/aws_s3_replica/buckets/bollywood/1700712206019-sk.jpg
         */
        
        const fullFilePath = path.join(process.cwd(), filePath);
        console.log("fullFilePath", fullFilePath)

        await fs.writeFile(fullFilePath, file.buffer, "binary")
        return "File uploaded"
    }

    async getListOfObjects(bucketName){
        const filePath = `./buckets/${bucketName}`;
        const files = await fs.readdir(filePath)

        return files
    }
    async getListOfBuckets(){
        const filePath = `./buckets`;
        const files = await fs.readdir(filePath)

        return files
    }

    async deleteObject(bucketName, fileName){
        const filePath = `buckets/${bucketName}/${fileName}`
        const fullFilePath = path.join(process.cwd(), filePath); 
        await fs.unlink(fullFilePath)
        return "File deleted"
    }
}
