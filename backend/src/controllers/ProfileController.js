const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page } = request.query;
        const ong_id = request.headers.authorization;

        const [count] = await connection('incidents').where('ong_id', ong_id).count();

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .limit(6)
            .offset((page - 1) * 6)
            .select('*');

        const total = count['count(*)'];
        response.header('X-Total-Count', count['count(*)']);

        return response.json([{ total }, incidents]);
    }
}