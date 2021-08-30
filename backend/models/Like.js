module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Like", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    like: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  });

  return Comment;
};
