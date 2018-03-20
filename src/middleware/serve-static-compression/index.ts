import * as serveStatic from 'serve-static';
import Compression from './Compression';
import Compressions from './Compressions';

const mime: any = serveStatic.mime;

function getPathname(url: string): string {
  return url
    .replace('//', '/')
    .split('?')[0]
    .split('#')[0];
}

function staticCompression(
  rootPath: string,
  options: { enableBrotli?: boolean; customCompressions?: Compression[] } = {}
): (req: any, res: any, next: any) => void {
  const defaultStatic: any = serveStatic(rootPath, options);
  const compressions: Compressions = new Compressions(rootPath);

  if (options.customCompressions && options.customCompressions.length > 0) {
    for (const customCompression of options.customCompressions) {
      compressions.register(customCompression.encodingName, customCompression.fileExtension);
    }
  }
  if (options.enableBrotli) {
    compressions.register('br', 'br');
  }
  compressions.register('gzip', 'gz');

  compressions.createFileIndex(rootPath);

  return (req: any, res: any, next: any): void => {
    const acceptEncoding: string = req.headers['accept-encoding'];
    const pathname: string = getPathname(req.url);
    const matchedFile: { compressions: Compression[] } | undefined = compressions.fileIndex[pathname];

    if (matchedFile !== undefined) {
      res.setHeader('Vary', 'Accept-Encoding');

      const compression: Compression | null = compressions.findByAcceptedEncoding(acceptEncoding);

      if (compression !== null) {
        const type: string = mime.lookup(pathname);
        const charset: string = mime.charsets.lookup(type);
        const search: string = req.url
          .split('?')
          .splice(1)
          .join('?');

        req.url = pathname + compression.fileExtension + (search === '' ? search : '?' + search);
        res.setHeader('Content-Encoding', compression.encodingName);
        res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
      }
    }

    defaultStatic(req, res, next);
  };
}

export default staticCompression;
