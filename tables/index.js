import Sequelize from 'sequelize';
// import { config} from 'dotenv/config';

const parameters = {
  database : "projectdb",
  user: "root",
  password : "110299",
  host : "localhost",
  port : "3306",
  dialect : "mysql",

};


// console.log(process.env.d=DATABASE_NAME);

const sequelize = new Sequelize(parameters.database, parameters.user, parameters.password,{
  host: parameters.host,
  port: parameters.port,
  dialect: parameters.dialect, 
  define: {
    timestamps: false,
  }
});

const connect = () => {
  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
};
  
export default {sequelize, connect};
