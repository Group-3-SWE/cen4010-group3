require("dotenv").config()
require('colors')

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

class DatabaseConfig {
    constructor(username, password, host, port, name, dialect) {
      this.host = host;
      this.username = username;
      this.password = password;
      this.name = name;
      this.port = port;
      this.dialect = dialect;
    }
}
  

function getDatabaseConfig () {
    const dbUser = process.env.DATABASE_USER || 'root'
    const dbPass = process.env.DATABASE_PASS ? process.env.DATABASE_PASS : 'password'
    const dbHost = process.env.DATABASE_HOST || 'localhost'
    const dbPort = process.env.DATABASE_PORT || '3306'
    const dbName = process.env.DATABASE_NAME || 'dbname'
    const dialect = "mysql"

    return new DatabaseConfig(dbUser, dbPass, dbHost, dbPort, dbName, dialect)
}

console.log("App Configured".red)
console.log("PORT: ".blue, PORT)
console.log("---")


module.exports = {
    PORT,
    getDatabaseConfig
}