// Helper functions for authentication flows
const prompt = require('prompt-sync')({sigint: true});
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const { Users } = require('./dbObjects');
const { drawHeading, sleep } = require('./uiHelper');
const { windowTransitionDelay } = require('../config.json');

/**
 * @description takes user through the registration flow
 * @returns { string } newly registered user's username
 */
async function registerUser() {
    drawHeading('REGISTER');

    // Flag for valid username
    let validUsernameRegister = false;
    let username;

    do {
        // Prompt for username until valid one given
        username = prompt('Choose a Username: ');
        // Username should not be same as the register command, and not already exist
        validUsernameRegister = username !== '!register' && !(await checkIfUsernameExists(username));
        if (!validUsernameRegister) {
            console.log('Username already exists or is invalid. Please try another one.');
        }
    } while (!validUsernameRegister);

    // Flag for correct password
    let passMatches = false;
    let password;

    do {
        // Prompt for username until valid one given
        password = prompt.hide('Choose a password: ');
        const passConfirm = prompt.hide('Confirm password: ');

        passMatches = (password === passConfirm);

        if (!passMatches) {
            console.log('Passwords don\'t match. Please re-enter');
        }
    } while (!passMatches);

    // Create hash for password
    const passHash = await bcrypt.hash(password, 10);

    // Create row in DB
    const userToCreate = {
        username,
        pass_hash: passHash,
    };

    await Users.create(userToCreate);

    console.log(chalk.green('Register successful. Now logged in.'));
    await sleep(windowTransitionDelay);
    return username;
}

// https://stackoverflow.com/a/42737209
/**
 * @description checks if a user with given username already exists in db
 * @param { string } username username to check
 * @returns { boolean } whether or not the user exists in db
 */
async function checkIfUsernameExists(username) {
    // Find the user in the db and manipulate it to return a boolean
    return Users.findOne({ where: { username } })
        .then(token => token !== null)
        .then(isUnique => isUnique);
}

module.exports = {
    registerUser,
};
