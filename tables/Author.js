module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
      AId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      AFirst: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ALast: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ABio: {
        type: DataTypes.STRING,
      },
    });
  
    return Author;
  };
  