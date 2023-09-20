module.exports = (sequelize, DataTypes) => {
  const Shopping = sequelize.define('Shopping', {
    SId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    SUser: {
      type: DataTypes.STRING(25),
      allowNull: false,
      references: {
        model: 'users',
        key: 'UUser',
      },
      onDelete: 'CASCADE',
    },
  });

  return Shopping;
};