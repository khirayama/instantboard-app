import Compression from './compression';

export interface IOptions {
  enableBrotli?: boolean;
  customCompressions?: Compression[];
}

export interface IFile {
  compressions: Compression[];
}
