module.exports = (sequelize, DataTypes) => {
  const WishlistBook = sequelize.define('WishlistBook', {
    WName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    WBook: {
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