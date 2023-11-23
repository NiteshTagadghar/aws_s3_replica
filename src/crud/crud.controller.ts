import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CrudService } from './crud.service';
import {  FileInterceptor } from '@nestjs/platform-express';


@Controller('crud')
export class CrudController {
    constructor(private readonly crudService: CrudService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile("file") file: Express.Multer.File, @Body() body) {
        return this.crudService.uploadFileToBucket(file, body)
    }

    @Get("objects")
    getListOfObjects(@Query("bucket_name") bucketName) {
        return this.crudService.getListOfObjects(bucketName);
    }
}
