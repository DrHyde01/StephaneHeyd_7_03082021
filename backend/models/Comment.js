module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('Comment', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
    
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
    
        comment: {
            type: Sequelize.STRING(300),
            allowNull: false
        },

    });

    return Comment;
};