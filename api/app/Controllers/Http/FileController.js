

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const FileService = use('App/Services/FileService');

class FileController {
  constructor (fileService = new FileService()) {
    this.fileService = fileService;
  }

  // eslint-disable-next-line no-empty-function
  async index (context) {

  }


  async show (context) {
    return await this.fileService.showFile(context);
  }

  async store (context) {
    return await this.fileService.insertFile(context);
  }

  // eslint-disable-next-line no-empty-function
  async update (context) {

  }

  async destroy (context) {
    return this.fileService.deleteFileFromPath(context);
  }
}

module.exports = FileController;
