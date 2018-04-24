export class Compression {
  public encodingName: string;

  public fileExtension: string;

  constructor(encodingName: string, fileExtension: string) {
    this.encodingName = encodingName;
    this.fileExtension = `.${fileExtension}`;
  }
}
