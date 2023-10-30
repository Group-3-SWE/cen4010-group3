module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
      GId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      GName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Genre;
  };
  