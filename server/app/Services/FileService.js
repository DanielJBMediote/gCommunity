/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */

const FileRepository = use('App/Repositories/FileRepository');
const Helpers = use('Helpers');

const fs = require('fs');
const path = require('path');

class FileService {
  constructor(fileRepository = new FileRepository()) {
    this.fileRepository = fileRepository;
  }

  async showFile({ response, params }) {
    const file = await this.fileRepository.getById(params.id);

    return response.download(Helpers.tmpPath(`uploads/${file.file}`));
  }

  async insertFile({ request, response }) {
    try {
      if (!request.file('file')) { return response.send('Não tem arquivo(s)'); }

      const upload = request.file('file', { size: '10mb' });
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const files = await this.fileRepository.insert({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      });

      return files;
    } catch (err) {
      return response.status(err.status).send({ msg: 'Erro ao dar upload do arquivo' });
    }
  }

  /**
   * Deleta o arquiva que está na pasta tmp
   * @param {Response} response
   * @param {Params} params
   */
  async deleteFileFromPath({ params }) {
    try {
      const filePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');
      const file = await this.fileRepository.getById(params.id);
      await this.fileRepository.delete(file);

      fs.unlink(path.resolve(`${filePath}/${file.file}`), (err) => {
        if (err) throw err;
        // response.send({ msg: 'Deu pau na hora de deletar o arquivo' });
      });
      // return response.status(200).send({ msg: 'Arquivo Deletado' });
    } catch (err) {
      // return response.status(err.status).send({ msg: 'Erro ao deletar o arquivo' });
    }
  }

  /**
   *  Deleta um arquivo baseado no ID da da tabela File
   * e insere um novo arquivo caso houver, retornando o id novo
   * @param {Request} request
   * @param {Integer} id
   */
  async updateFileByID({ request, fileID }) {

    // Se houer ariquivo na minha requisição e troco pelo meu atual
    if (request.file('file')) {
      // Se no meu banco de File já ter um arquivo, eu vou deletar e depois inserir um novo
      if (fileID) {
        await this.deleteFileFromPath({ params: { id: fileID } });
      }
      return await this.insertFile({ request });
    } if (!(request.file('file'))) {
      if (fileID) {
        await this.deleteFileFromPath({ params: { id: fileID } });
      }
    }

  }
}

module.exports = FileService;
