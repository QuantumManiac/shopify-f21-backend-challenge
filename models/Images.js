module.exports = (sequelize, DataTypes) => {
    return sequelize.define('images', {
        name: DataTypes.STRING, // Image name
        description: DataTypes.STRING, // Image description
        author: DataTypes.STRING, // Image creator
        views: { // Times image has been viewed
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        image: DataTypes.STRING, // Base64 string for image
    });
};
