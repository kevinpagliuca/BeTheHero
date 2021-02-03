module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'db',     
      user: 'root',
      password: 'root',
      database: 'MasterBeTheHero'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,

  },

  test: {
    client: 'mysql',
    connection: {
      host: 'db',
      user: 'root',
      password: 'root',
      database: 'MasterBeTheHero',
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,

  },
}; 