module.exports = (sequelize, DataTypes) => {
    const Publisher = sequelize.define('Publisher', {
      PuId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      PuName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Publisher;
  };
  