export default class Compression {
  public encodingName: string;

  public fileExtension: string;

  constructor(encodingName, fileExtension) {
    this.encodingName = encodingName;
    this.fileExtension = '.' + fileExtension;
  }
}
