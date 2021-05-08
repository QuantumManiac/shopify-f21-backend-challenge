const prompt = require('prompt-sync')({sigint: true});
const chalk = require('chalk');

const { windowWidth } = require('../config.json');

/**
 * @description prints to console a decorated heading
 * @param {string} headingText The heading text to use
 */
function drawHeading(headingText) {
    console.log(`${chalk.gray('='.repeat(windowWidth))}
${chalk.bold(headingText.toUpperCase())}
${chalk.gray('='.repeat(windowWidth))}\n`);
}

/**
 * @description prints to console a smaller decorated heading
 * @param {string} headingText The heading text to use
 */
function drawSmallerHeading(headingText) {
    // Do calculations to figure out how much "padding decoration" is required for the text length
    // Need equal amounts on each side, and the heading needs to be a specific length
    const decorLength = windowWidth - headingText.length - 2;
    const halfDecorLength = decorLength / 2;
    let leftDecorLength;
    let rightDecorLength;

    // In case doesn't divide easily (uneven decoration on both sides of text)
    if (Number.isInteger(halfDecorLength)) {
        leftDecorLength = rightDecorLength = halfDecorLength;
    } else {
        leftDecorLength = Math.floor(halfDecorLength);
        rightDecorLength = leftDecorLength + 1;
    }

    console.log(`${chalk.gray('='.repeat(leftDecorLength))} ${chalk.bold(headingText.toUpperCase())} ${chalk.gray('='.repeat(rightDecorLength))}`);
}

/**
 * @description prints to console a decorated divider
 */
function drawDivider() {
    console.log(chalk.gray('='.repeat(windowWidth), '\n'));
}

/**
 * @description Prints to console an options menu
 * @param {Array} optionNames The names of the options to display
 */
function drawOptionsMenu(optionNames) {

    drawSmallerHeading('OPTIONS');

    optionNames.forEach((option, index) => {
        console.log(`${chalk.blueBright(`[${index + 1}]`)} - ${option}`);
    });

    drawDivider();
}

/**
 * @description Prompts and handles user option choice
 * @param {Object} options contains name of option as key and value to return as value
 * @returns the return value of the selected option
 */
function optionHandler(options) {
    drawOptionsMenu(Object.keys(options));

    // Flag to check if valid choice
    let validChoice = false;

    // Prompt for choice
    do {
        let userChoice = Number(prompt('Choose an action: ').toLowerCase()) - 1;

        let choice = Object.keys(options)[userChoice];

        if (!choice) {
            console.log(chalk.red('Invalid choice'));
        } else {
            validChoice = true;
            return options[choice];
        }
    } while (!validChoice);
}

// https://stackoverflow.com/a/7197112
/**
 * @description truncates and adds ellipses to end of string if it's over the max length provided
 * @param {string} text the string to make shorter if needed
 * @param {number} length the max length of the string
 * @returns modified string
 */
function textAbstract(text, length) {
    if (text == null) {
        return '';
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    let last = text.lastIndexOf(' ');
    text = text.substring(0, last);
    return text + '...';
}

// https://stackoverflow.com/a/39914235 - can probably be integrated better, but it works
/**
 * @description "sleeps" the program for the given amount of time
 * @param {number} ms time to sleep in milliseconds
 * @returns {Promise} the promise for the timeout
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    drawHeading,
    drawSmallerHeading,
    drawDivider,
    optionHandler,
    sleep,
    textAbstract,
};
