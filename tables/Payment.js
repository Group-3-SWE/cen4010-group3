module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    PCard: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // If you don't want it to auto-increment
    },
    PUser: {
      type: DataTypes.STRING(25),
      allowNull: false,
      references: {
        model: 'users',
        key: 'UUser',
      },
      onDelete: 'CASCADE',
    },
    PName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    PBilling: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  });

  return Payment;
};