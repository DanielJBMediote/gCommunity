
const { validate } = use('Validator')
const UserRepository = use('App/Repositories/UserRepository')

class UserService {

    constructor(
        userRepository = new UserRepository()
    ) {
        this.userRepository = userRepository

        this.rules = {
            email: 'required',
            username: 'required',
            password: 'required'
        }
    }

    async insertUser({ request, response }) {
        const data = request.only(["username", "email", "password"])

        if (!(await validate(data, this.rules))) {
            return response.status(400).send({ message: 'Alguns campos requer atenção' })
        }
        try {
            const user = await this.userRepository.insert(data)
            return response.status(200).send({ message: "Success", data: user })
        } catch (err) {
            return response
                .status(400)
                .send({
                    message: 'error',
                    error: err.code == 23505 ? 'Email ou Usuário já Existente' : 'Algo deu Errado',
                })
        }
    }

    async updateUser({ request, response, auth }) {
        const data = request.all()
        try {
            const userDB = await this.userRepository.getById(auth.user.id)
            if (userDB) {

                userDB.email = data.email
                userDB.fullname = data.fullname
                userDB.password = data.password
                // userDB.avatar_url = data.avatar
                userDB.age = data.age
                return response.status(200).send(await this.userRepository.getById(auth.user.id))
            } else return response.status(401).send({ msg: 'Você precisa estar na sua conta para altear' })
        } catch (err) {
            return response.status(err.status).send({ message: 'Ops, algo deu errado' })
        }
    }

    async deleteUser({ response, auth }) {
        await this.userRepository.delete(await this.userRepository.getById(auth.user.id))
        return response.status(200).send({ msg: 'Usuario foi deletado, voce será redirecionado par tela de login' })
    }
}

module.exports = UserService