import { DataTypes } from 'sequelize';
import  sequelize from './index.js';



  export const User = sequelize.sequelize.define('User', {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsAdmin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    }
  });

