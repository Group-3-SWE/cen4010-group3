module.exports = (sequelize, DataTypes) => {
  const BooksToShopping = sequelize.define('BooksToShopping', {
    AId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ABook: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'books',
        key: 'BISBN',
      },
      onDelete: 'CASCADE',
    },
  });

  return BooksToShopping;
};
