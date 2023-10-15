import { DataTypes } from 'sequelize';
import  sequelize from './index.js';
import { User } from './User.js';
import { Book } from './Book.js';


  export const Wishlist = sequelize.sequelize.define('Wishlist', {
    WishlistId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  
  });

  Wishlist.belongsTo(User, {
    foreignKey:{
      name: 'UserId',
      allowNull: false,
    }
  });

  User.hasMany(Wishlist, {
    foreignKey:{
      name: 'UserId',
      allowNull: false,
    }
    });

    Book.belongsToMany(Wishlist, {
      through:'books_wishlists',
      foreignKey: 'BookId'
    });

    Wishlist.belongsToMany(Book, {
      through:'books_wishlists',
      foreignKey: 'WishlistId'
    });
  


    export const create = (
      Name, 
      UserId,
    ) => Wishlist.create({
      Name,
      UserId,
    }).then((result) => ({status: 'success', data: result})) 
    .catch((err) => ({
      status: 'error',
      data: err,
    }));
