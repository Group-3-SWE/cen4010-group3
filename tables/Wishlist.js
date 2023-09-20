module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('Wishlist', {
    AName: {
      type: DataTypes.STRING(200),
      primaryKey: true,
    },
    AUser: {
      type: DataTypes.STRING(25),
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'UUser',
      },
      onDelete: 'CASCADE',
    },
  });

  return Wishlist;
};