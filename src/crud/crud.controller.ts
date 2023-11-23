import { Body, Controller, Delete, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CrudService } from './crud.service';
import {  FileInterceptor } from '@nestjs/platform-express';


@Controller('crud')
export class CrudController {
    constructor(private readonly crudService: CrudService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile("file") file, @Body() body) {
        return this.crudService.uploadFileToBucket(file, body)
    }

    @Get("objects")
    getListOfObjects(@Query("bucket_name") bucketName) {
        return this.crudService.getListOfObjects(bucketName);
    }

    @Get("buckets")
    getListOfBuckets() {
        return this.crudService.getListOfBuckets();
    }

    @Delete("objects")
    deleteObject(@Query("bucket_name") bucketName, @Query("file_name") fileName) {
        return this.crudService.deleteObject(bucketName, fileName);
    }
}
