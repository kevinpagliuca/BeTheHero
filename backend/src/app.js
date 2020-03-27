const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;


/*
GET: Buscar/listar uma informação do backend
POST: Criar uma informação do backend
PUT: Alterar uma informação do backend
DELETE: Deletar uma informação do backend
*/


/**
 * Tipos de parâmetros
 *  
 * Query Params: Parametros nomeados enviados na rota apos o simbolo "?" (filtros, paginação)
 * Route Params: Parametros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos.

 */