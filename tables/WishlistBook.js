module.exports = (sequelize, DataTypes) => {
  const WishlistBook = sequelize.define('WishlistBook', {
    WId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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

  return WishlistBook;
};