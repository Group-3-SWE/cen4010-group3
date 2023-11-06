module.exports = (sequelize, DataTypes) => {
    const Ratings = sequelize.define('Ratings', {
      RISBN: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Books',
            key: 'BISBN',
          },
          onDelete: 'CASCADE',
      },
      RRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      RUser: {
        type: DataTypes.STRING(25),
        allowNull: false,
        references: {
          model: 'AUser',
          key: 'UUser',
        },
        onDelete: 'CASCADE',
      },
    });
  
    return Ratings;
  };