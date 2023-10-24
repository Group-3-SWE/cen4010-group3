module.exports = (sequelize, DataTypes) => {
  const BooksToShopping = sequelize.define('BooksToShopping', {
    AId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    SId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shopping',
        key: 'SId',
      },
      onDelete: 'CASCADE',
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

  return BooksToShopping;
};
