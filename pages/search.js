const chalk = require('chalk');
const prompt = require('prompt-sync')({sigint: true});

const { drawHeading } = require('../helpers/uiHelper');

/**
 * @description The search page
 * @param {Object} state the state of the application
 * @returns {Object} the resulting state
 */
module.exports = async function search(state) {
    drawHeading('SEARCH');

    // Flag for valid search term (not just spaces)
    let validSearchTerm = false;
    let searchTerm;

    do {
        console.log(`Enter a search term\n${chalk.gray('\n(or enter \"!random\" for random images, \"!exit\" to exit)')}`);
        searchTerm = prompt(': ');

        // Check if search term is just spaces
        if (searchTerm.replace(/\s+/g, '') === '') {
            console.log(chalk.red('Please enter a search term'));
            validSearchTerm = false;
        } else {
            validSearchTerm = true;
        }
    } while (!validSearchTerm);

    let newState = {};

    if (searchTerm === '!exit') {
        newState = {page: 'main'};
    } else {
        newState = {page: 'searchResults', search: searchTerm};
    }

    return newState;
};
