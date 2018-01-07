import * as fs from 'fs';
import Compression from './compression';
import { IFile } from './interfaces';

export default class Compressions {
  public data: Compression[] = [];

  public fileIndex: any = {};

  private rootPath: string;

  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  public register(encodingName: string, fileExtension: string): void {
    if (this.findByEncodingName(encodingName) === null) {
      this.data.push(new Compression(encodingName, fileExtension));
    }
  }

  public createFileIndex(path: string): void {
    if (!fs.existsSync(path)) {
      return;
    }

    const fileNames: string[] = fs.readdirSync(path);
    for (const fileName of fileNames) {
      const filePath: string = path + '/' + fileName;
      const stats: any = fs.statSync(filePath);

      if (stats.isDirectory()) {
        this.createFileIndex(filePath);
      } else {
        this.addFileToIndex(filePath);
      }
    }
  }

  public findByAcceptedEncoding(acceptedEncoding: string): Compression | null {
    if (acceptedEncoding) {
      for (const compression of this.data) {
        if (acceptedEncoding.indexOf(compression.encodingName) !== -1) {
          return compression;
        }
      }
    }
    return null;
  }

  private addFileToIndex(filePath: string): void {
    for (const compression of this.data) {
      if (filePath.endsWith(compression.fileExtension)) {
        // To change local file path to server file path
        const srcFilePath: string = filePath.replace(compression.fileExtension, '').replace(this.rootPath, '');
        const file: IFile | undefined = this.fileIndex[srcFilePath];
        if (file === undefined) {
          this.fileIndex[srcFilePath] = {
            compressions: [compression],
          };
        } else {
          file.compressions.push(compression);
        }
        break;
      }
    }
  }

  private findByEncodingName(encodingName: string): Compression | null {
    for (const compression of this.data) {
      if (compression.encodingName === encodingName) {
        return compression;
      }
    }
    return null;
  }
}
