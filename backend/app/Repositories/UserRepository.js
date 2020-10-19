
const UserModel = use('App/Models/User')

class UserRepository {

    async getById(id) {
        return (await UserModel.findOrFail(id))
    }

    async insert(data) {

        // Default Values
        data.active_status = true;
        data.provider = false;

        return (await UserModel.create(data))
    }

    async update(data) {
        return (await data.save())
    }

    async delete(data, id) {
        return (await data.delete())
    }
}

module.exports = UserRepository