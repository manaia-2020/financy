const path = require('path')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, './server/database/dev.sqlite3')
    },
    migrations: {
      directory: path.join(__dirname, '/server/database/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/server/database/seeds')
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations: {
      directory: path.join(__dirname, 'server/database/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'server/database/seeds')
    },
    useNullAsDefault: true
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'server/database/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'server/database/seeds')
    }
  }

}
