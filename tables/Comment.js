module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    CommentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    CommentContent: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    CommentUsername: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    CommentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    ISBN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'books',
        key: 'BISBN',
      },
      onDelete: 'CASCADE',
    },
  });

  return Comment;
};
