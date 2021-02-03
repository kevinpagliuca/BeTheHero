const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, password, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);    

        await connection('ongs').insert({
            id,
            name,
            email,
            password: hash,
            whatsapp,
            city,
            uf,
        })
        return response.json({id});
    },

    async delete(request, response) {
        const { name } = request.params;

        await connection('ongs')
            .where('name', name)
            .delete();
        return response.status(204).send();
    }
};