module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    UUser: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    UPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UEMAIL: {
      type: DataTypes.STRING,
      unique: true,
    },
    UAddress: {
      type: DataTypes.STRING,
    },
    UName: {
      type: DataTypes.STRING,
    },
  });

  return AUser;
};
