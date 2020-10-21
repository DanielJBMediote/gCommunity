
const FIleModel = use('App/Models/File');

class FileRepository {
  async getById (id) {
    return await FIleModel.findOrFail(id);
  }

  async insert (file) {
    return await FIleModel.create(file);
  }

  async delete (file) {
    return (await file.delete());
  }
}

module.exports = FileRepository;
