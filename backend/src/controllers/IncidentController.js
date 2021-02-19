const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        console.log(count);
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(8)
            .offset((page - 1) * 8)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        const total = count['count(*)'];
        response.header('X-Total-Count', count['count(*)']);

        return response.status(200).json([{ total }, incidents]);
    },

    async show(request, response) {
        const { id } = request.params;

        const incident = await connection('incidents')
        .where('id', id)
        .first()
        .select('*');

        if(incident) {
            return response.status(200).json(incident);
        } else {
            return response.status(400).json({Error: 'Error, no incident found with this ID'})
        }
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permited.' });
        }
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }

};