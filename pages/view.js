const terminalImage = require('terminal-image');
const chalk = require('chalk');

const { windowWidth, windowTransitionDelay } = require('../config.json');
const { optionHandler, drawSmallerHeading, drawDivider, sleep } = require('../helpers/uiHelper');
const { sequelize, Images } = require('../helpers/dbObjects');

/**
 * @description The view image page
 * @param {Object} state the state of the application
 * @returns {Object} the resulting state
 */
module.exports = async function viewImage(state) {
    if (!state.imageId) return {page: 'main'};

    // Get image data
    const imageData = await fetchImageFromId(state.imageId);

    // Get image buffer for displaying
    const imageBuffer = decodeImageFromBase64(imageData.image);

    // Display image
    drawSmallerHeading('VIEW IMAGE');
    console.log(await terminalImage.buffer(imageBuffer, {width: windowWidth}));
    drawDivider();
    console.log(`${chalk.bold(imageData.name.toUpperCase())}

Author: ${chalk.yellowBright(imageData.author)}
Description: ${imageData.description}
Views: ${imageData.views}
`);

    const viewOptions = {};

    // If creator is viewing, can delete it
    if (imageData.author === state.user) {
        viewOptions['Delete Image'] = { delete: true, image: null };
    }

    // If coming from a search, can return to it
    if (state.search) {
        viewOptions['Back to Search'] = {page: 'searchResults', image: null};
    }

    viewOptions['Exit to Menu'] = {page: 'main', search: null, image: null};

    let newState = optionHandler(viewOptions);

    // Delete the image if chosen
    if (newState.delete) {
        deleteImage(imageData.id);
        // "Consume" the delete state
        delete newState.delete;

        console.log(chalk.red('Image deleted'));
        await sleep(windowTransitionDelay);

        // Go to previous page depending on if user came from a search or not
        if (state.search) {
            newState.page = 'search';
        } else {
            newState.page = 'main';
        }
    }

    return newState;
};

/**
 * @description Fetches an image and its data from the DB from its id
 * @param {string} id The DB id for the imagee
 * @returns {Object} the object from the DB containing the image data and info
 */
async function fetchImageFromId(id) {
    // Update number of views then retreive the image
    await Images.update({views: sequelize.literal('views + 1')}, {where: { id }});
    return Images.findOne({where: {id}, raw: true});
}

/**
 * @description Decodes a base64 string and turn it into a buffer
 * @param {string} imageString The base64 string of the image
 * @returns {Buffer} a buffer containing the decoded image
 */
function decodeImageFromBase64(imageString) {
    return Buffer.from(imageString, 'base64');
}

/**
 * @description Deletes an image of the given ID
 * @param {string} id the DB id for the image
 * @returns {number} the number of items destroyed
 */
async function deleteImage(id) {
    return Images.destroy({where: {id}});
}


