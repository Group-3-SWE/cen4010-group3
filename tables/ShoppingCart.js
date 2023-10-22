module.exports = (sequelize, DataTypes) => {
  const Shopping = sequelize.define('Shopping', {
    SId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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

  return Shopping;
};