const { Books } = require("./Books.js");
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    CId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    CContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CRating: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
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
    BISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'books',
        key: 'BISBN',
      },
      onDelete: 'CASCADE',
    },
  });

  Comment.associate = (tables) => {
    Comment.belongsTo(tables.Books, {
      foreignKey: 'BISBN'
    });
  }
  
  return Comment;
};
