import { DataTypes } from 'sequelize';
import  sequelize from './index.js';

  export const Book = sequelize.sequelize.define('Book', {
      BookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ISBN: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Sold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
