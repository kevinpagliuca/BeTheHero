const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async show(request, response) {
        const { id } = request.body;

        const ongInfo = await connection('ongs')
            .select('*')
            .where('id', id)
            .first();

        if (ongInfo) {
            return response.status(200).json(ongInfo);
        } else {
            return response.status(404).json({ Error: "No ONG found with this ID" })
        }
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
        return response.json({ id });
    },

    async update(request, response) {
        const  id  = request.headers.id;
        const { name, email, whatsapp, city, uf } = request.body;

        const consult = await connection('ongs')
            .select('name')
            .where('id', id)
            .first();

        if (consult) {
            await connection('ongs')
                .where('id', id)
                .update({
                    name,
                    email,
                    whatsapp,
                    city,
                    uf
                });

            return response.status(200).json({ Success: 'Atualizado com sucesso!' });
        } else {
            return response.status(400).json({ Error: 'Não conseguimos atualizar seus dados, tente novamente!' })
        }
    },

    async delete(request, response) {
        const { name } = request.params;

        await connection('ongs')
            .where('name', name)
            .delete();
        return response.status(204).send();
    }
};