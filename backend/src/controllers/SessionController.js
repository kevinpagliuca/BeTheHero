const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async create(request, response) {
        const { option } = request.body;

        if (option === 1) {
            const { id, password } = request.body;

            const ong = await connection('ongs')
                .where('id', id)
                .select('name', 'email', 'id')
                .first();
            console.log(ong);

            const findPassword = await connection('ongs').select('password').where('id', id).first();

            if (ong) {
                if (findPassword) {
                    const match = await bcrypt.compare(password, findPassword.password);
                    if (match) {
                        return response.status(200).json(ong);
                    } else {
                        return response.status(400).json({ error: 'This password is wrong!' });
                    }
                }
            } else {
                return response.status(400).json({ error: 'No ONG found with this ID' });
            }
        }
        if (option === 0) {
            const { email, password } = request.body;

            const ong = await connection('ongs')
                .where('email', email)
                .select('name', 'email', 'id')
                .first();

            const findPassword = await connection('ongs').select('password').where('email', email).first();

            if (ong) {
                if (findPassword) {
                    const match = await bcrypt.compare(password, findPassword.password);
                    if (match) {
                        return response.status(200).json(ong);
                    } else {
                        return response.status(400).json({ error: 'This password is wrong!' });
                    }
                }
            } else {
                return response.status(400).json({ error: 'No ONG found with this Email' });
            }
        }


    }

}