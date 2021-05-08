const chalk = require('chalk');

const { optionHandler, drawHeading } = require('../helpers/uiHelper');

/**
 * @description The main menu page
 * @param {Object} state the state of the application
 * @returns {Object} the resulting state
 */
module.exports = async function mainOptions(state) {

    drawHeading('MAIN MENU');

    console.log(`Welcome, ${chalk.yellowBright(state.user)}.\n`);

    // Main menu options
    const options = {
        'Search Images': {page: 'search'},
        'Add an Image': {page: 'add'},
        'Log out': {page: 'login', user: null},
        'Exit App': {exitFlag: true},
    };

    return await optionHandler(options);
};


