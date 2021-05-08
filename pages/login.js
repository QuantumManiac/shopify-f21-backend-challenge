const bcrypt = require('bcrypt');
const prompt = require('prompt-sync')({sigint: true});
const chalk = require('chalk');

const { drawHeading, sleep } = require('../helpers/uiHelper');
const { registerUser } = require('../helpers/authHelper');
const { windowTransitionDelay } = require('../config.json');
const { Users } = require('../helpers/dbObjects');

/**
 * @description The login page
 * @param {Object} state the state of the application
 * @returns {Object} the resulting state
 */
module.exports = async function loginPrompt(state) {
    drawHeading('LOGIN');

    let username;

    // Flag for valid username
    let validUsernameLogin = false;
    let user;

    do {
        // Prompt user to login or register
        username = prompt(`Username ${chalk.gray('(or enter \"!register\" to register)')}: `);

        if (username === '!register') {
            console.clear();
            return {
                // Register user if option is chosen
                user: await registerUser(),
                page: 'main',
            };
        }

        user = await Users.findOne({ where: {username}, raw: true});

        if (!user) {
            console.log(chalk.red('User does not exist'));
        } else {
            validUsernameLogin = true;
        }
    } while (!validUsernameLogin);

    // Flag for valid password
    let validPassword = false;

    do {
        const password = prompt.hide('Password: ');
        // Verify that password "matches" hash
        validPassword = await bcrypt.compare(password, user.pass_hash);

        if (!validPassword) console.log(chalk.red('Invalid password'));
    } while (!validPassword);


    console.log(chalk.green('Login successful'));
    await sleep(windowTransitionDelay);
    return {
        user: username,
        page: 'main',
    };
};
