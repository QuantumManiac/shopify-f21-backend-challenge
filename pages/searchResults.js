const chalk = require('chalk');
const prompt = require('prompt-sync')({sigint: true});

const { drawHeading, optionHandler, textAbstract } = require('../helpers/uiHelper');
const { sequelize, Images } = require('../helpers/dbObjects');

/**
 * @description The search results page
 * @param {Object} state the state of the application
 * @returns {Object} the resulting state
 */
module.exports = async function searchResults(state) {
    let results;

    // Get results randomly or from the search term, both from the state
    if (state.search === '!random') {
        results = await getRandomResults();
    } else {
        results = await getSearchResults(state.search);
    }

    // Draw window
    drawHeading('RESULTS');
    displaySearchResults(results);

    let searchResultOptions = {};

    // If there are images to view, give the option to do so
    if (results.length) {
        searchResultOptions['View Image'] = { viewImage: true };
    }

    searchResultOptions['New Search'] = { page: 'search', search: null};
    searchResultOptions['Exit to Menu'] = { page: 'main', search: null};

    let newState = optionHandler(searchResultOptions);

    // Take the user through the image viewing flow
    if (newState.viewImage) {
        // "consume" the viewImage state
        delete newState.viewImage;
        let validNumber = false;

        let imageNumber;

        do {
            console.log(`Enter the index of the image you want to view ${chalk.gray('\n(or enter \"!exit\" to go back to search)')}`);
            imageNumber = prompt(': ');

            if (imageNumber === '!exit') {
                return {
                    page: 'search',
                    search: null,
                };
            } else {
                imageNumber = Number(imageNumber);
            }

            validNumber = (results[imageNumber]);

            if (!validNumber) {
                console.log(chalk.red('Invalid choice.'));
            }

        } while (!validNumber);

        newState = {
            page: 'view',
            imageId: results[imageNumber].id,
        };
    }

    return newState;
};

/**
 * @description Displays the retrieved search results
 * @param {Object[]} results An array of image objects
 */
function displaySearchResults(results) {
    console.log(chalk.bold(`${'Index'.padEnd(5)} | ${'Name'.padEnd(40)} | ${'Author'.padEnd(15)}`));

    // If no results, show such
    if (!results.length) {
        console.log(chalk.red('        ================== NO RESULTS ==================        '));
    } else {
        // Otherwise, create a table of the results
        results.forEach((result, index) => {
            console.log(`${String(index).padEnd(5)} | ${textAbstract(result.name, 36).padEnd(40)} | ${textAbstract(result.author, 12).padEnd(15)}`);
        });
    }
    console.log('\n');
}

/**
 * @description Get 10 random results from the DB
 * @returns {Object[]} An array of image objects
 */
async function getRandomResults() {
    return await Images.findAll({ order: sequelize.random(), limit: 10, raw: true});
}

/**
 * @description Get the results from the search term, checking the term in the title and description
 * @param {string} searchTerm The search term to get results for
 * @returns {Object[]} An array of image objects
 */
async function getSearchResults(searchTerm) {
    return await Images.findAll({
        where: sequelize.or(
            // searchTerm is in name OR description
            {name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchTerm + '%')},
            {description: sequelize.where(sequelize.fn('LOWER', sequelize.col('description')), 'LIKE', '%' + searchTerm + '%')},
        ),
        // Get only fields required to populate table and identify rows
        attributes: ['id', 'name', 'author'],
        raw: true,
    });
}
