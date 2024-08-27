/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg', // Use PostgreSQL
    connection: {
      host: '127.0.0.1', // Localhost
      database: 'leatherbound_db', // Your database name
      user: 'leatherbound_user', // Your database user
      password: 'ScoutHank64' // Your database password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations', // Directory for migration files
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg', // Use PostgreSQL
    connection: {
      host: '127.0.0.1', // Localhost or appropriate staging host
      database: 'leatherbound_db', // Your staging database name
      user: 'leatherbound_user', // Your staging database user
      password: 'ScoutHank64' // Your staging database password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations', // Directory for migration files
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg', // Use PostgreSQL
    connection: {
      host: '127.0.0.1', // Your production database host
      database: 'leatherbound_db', // Your production database name
      user: 'leatherbound_user', // Your production database user
      password: 'ScoutHank64' // Your production database password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations', // Directory for migration files
      tableName: 'knex_migrations'
    }
  }

};
