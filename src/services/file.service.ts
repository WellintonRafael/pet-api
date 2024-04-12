import { Injectable } from "@nestjs/common";
import IFileService from "src/interfaces/file.service.interface";
import * as fs from 'fs';

@Injectable()
export default class FileService implements IFileService{
    async readFile(path: string): Promise<Buffer> {
        return fs.readFileSync(path)
    }
}