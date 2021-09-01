module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    comment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Comment;
};
