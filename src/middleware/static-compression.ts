import * as fs from 'fs';
import * as serveStatic from 'serve-static';

interface IOptions {
  enableBrotli?: boolean;
  customCompressions?: Compression[];
}

interface IFile {
  compressions: Compression[];
}

/*
 * - const mime
 * - function getPathname
 * - class Compression
 * - class Compressions
 *  - data
 *  - fileIndex
 *  - rootPath
 *  - register()
 *  - createFileIndex()
 *  - addFileToIndex()
 *  - findByEncodingName()
 *  - findByAcceptedEncoding()
 * - staticCompression
*/

const mime: any = serveStatic.mime;

function getPathname(url: string): string {
  return (url.replace('//', '/').split('?')[0]).split('#')[0];
}

class Compression {
  public encodingName: string;

  public fileExtension: string;

  constructor(encodingName, fileExtension) {
    this.encodingName = encodingName;
    this.fileExtension = '.' + fileExtension;
  }
}

class Compressions {
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

    for (let i: number = 0; i < fileNames.length; i++) {
      const filePath: string = path + '/' + fileNames[i];
      const stats: any = fs.statSync(filePath);

      if (stats.isDirectory()) {
        this.createFileIndex(filePath);
      } else {
        this.addFileToIndex(filePath);
      }
    }
  }

  private addFileToIndex(filePath: string): void {
    for (let i: number = 0; i < this.data.length; i++) {
      const compression = this.data[i];

      if (filePath.endsWith(compression.fileExtension)) {
        // To change local file path to server file path
        const srcFilePath: string = filePath.replace(compression.fileExtension, '').replace(this.rootPath, '');
        const file: IFile|undefined = this.fileIndex[srcFilePath];
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

  private findByEncodingName(encodingName: string): Compression|null {
    for (let i: number = 0; i < this.data.length; i++) {
      const compression: Compression = this.data[i];
      if (compression.encodingName === encodingName) {
        return compression;
      }
    }
    return null;
  }

  public findByAcceptedEncoding(acceptedEncoding: string): Compression|null {
    if (acceptedEncoding) {
      for (let i: number = 0; i < this.data.length; i++) {
        const compression: Compression = this.data[i];
        if (acceptedEncoding.indexOf(compression.encodingName) !== -1) {
          return compression;
        }
      }
    }
    return null;
  }
}

function staticCompression(rootPath: string, options: IOptions = {}): (req: any, res: any, next: any) => void {
  const defaultStatic: any = serveStatic(rootPath, options);
  const compressions: Compressions = new Compressions(rootPath);

  if (options.customCompressions && options.customCompressions.length > 0) {
    for (let i: number = 0; i < options.customCompressions.length; i++) {
      const customCompression: Compression = options.customCompressions[i];
      compressions.register(customCompression.encodingName, customCompression.fileExtension);
    }
  }
  if (options.enableBrotli) {
    compressions.register('br', 'br');
  }
  compressions.register('gzip', 'gz');

  compressions.createFileIndex(rootPath);

  return function middleware(req: any, res: any, next: any): void {
    const acceptEncoding: string = req.headers['accept-encoding'];
    const pathname: string = getPathname(req.url);
    const matchedFile: IFile|undefined = compressions.fileIndex[pathname];

    if (matchedFile !== undefined) {
      res.setHeader('Vary', 'Accept-Encoding');

      const compression: Compression|null = compressions.findByAcceptedEncoding(acceptEncoding);

      if (compression !== null) {
        const type: string = mime.lookup(pathname);
        const charset: string = mime.charsets.lookup(type);
        const search: string = req.url.split('?').splice(1).join('?');

        req.url = pathname + compression.fileExtension + ((search !== '') ? '?' + search : search);
        res.setHeader('Content-Encoding', compression.encodingName);
        res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
      }
    }

    defaultStatic(req, res, next);
  };
}

export default staticCompression;
