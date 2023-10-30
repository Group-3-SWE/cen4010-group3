module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    PId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PCard: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
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

  return Payment;
};
