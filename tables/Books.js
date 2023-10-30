module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define('Books', {
      BISBN: {
        type: DataTypes.STRING(13),
        primaryKey: true,
        autoIncrement: false,
      },
      BName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      BDesc: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      BPrice: {
        type: DataTypes.FLOAT(10),
        allowNull: false,
      },
      BGenre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      BPublisher: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      BYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BCopiesSold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BRatingSum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BRatingCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BAuthor: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });
    return Books;
  };

