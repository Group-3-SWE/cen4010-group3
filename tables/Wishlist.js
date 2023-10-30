module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('Wishlist', {
    WlId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    WlName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'UId',
      },
      onDelete: 'CASCADE',
    },
  });

  return Wishlist;
};