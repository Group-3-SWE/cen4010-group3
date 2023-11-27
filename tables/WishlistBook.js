module.exports = (sequelize, DataTypes) => {
  const WishlistBook = sequelize.define('WishlistBook', {
    WId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    WlId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'books', 
        key: 'BISBN',
      },
      onDelete: 'CASCADE',
    },
  });

  WishlistBook.associate = (tables) => {
    WishlistBook.belongsTo(tables.Books, {
      foreignKey: 'BISBN'
    });
  }

  

  return WishlistBook;
};