module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        username: { // Username
            type: DataTypes.STRING,
            primaryKey: true,
        },
        pass_hash: DataTypes.STRING, // User password (hashed)
    });
};
