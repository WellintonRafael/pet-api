export default interface IFileService {
    readFile(path: string): Promise<Buffer>;
}
