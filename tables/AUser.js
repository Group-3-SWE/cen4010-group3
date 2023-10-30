module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    UId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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

  return User;
};
