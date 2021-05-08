const chalk = require('chalk');
const fs = require('fs');
const axios = require('axios');
const prompt = require('prompt-sync')({sigint: true});
const terminalImage = require('terminal-image');

const { Images } = require('../helpers/dbObjects');
const { windowWidth, windowTransitionDelay } = require('../config.json');
const { optionHandler, drawHeading, drawSmallerHeading, drawDivider, sleep } = require('../helpers/uiHelper');

/**
 * @description The add image page
 * @param {Object} state the state of the application
 * @returns {Object} the resulting state
 */
module.exports = async function addImage(state) {

    drawHeading('ADD IMAGE');

    console.log('Add an image to the repository.\nChoose the source for your image');

    // Options for image location
    const addImageSourceOptions = {
        'Browse Locally (relative path)': {source: 'path'},
        'Enter an image URL': {source: 'url'},
        Exit: {source: 'exit'},
    };

    const { source } = optionHandler(addImageSourceOptions);

    // Exit if option is chosen
    if (source === 'exit') return exitToMenu();

    // Flag for valid image check
    let validImage = false;
    let imageResult;

    do {

        let imageLocation = prompt(`Enter image ${source} ${chalk.gray('(or enter \"!exit\" to exit)')}: `).replace('"', '');

        // Exit if object is chosen
        if (imageLocation === '!exit') return exitToMenu();

        // Fetch the requested image as a base64 string to be put into the DB
        try {
            imageResult = await fetchImageAsBase64(source, imageLocation);
            validImage = true;
        } catch (err) {
            console.log(chalk.red('Invalid image'));
            validImage = false;
        }

    } while (!validImage);

    // Display image preview
    drawSmallerHeading('PREVIEW');
    console.log(await terminalImage.buffer(imageResult.imageBuffer, {width: windowWidth})); // Could also display gifs with terminalImage.gifBuffer. TODO?
    drawDivider();

    // Take user through image addition flow
    let imageName = prompt('Enter a name to add it to the repository, or enter \"!exit\" to exit: ');
    if (imageName === '!exit') return exitToMenu();

    let imageDesc = prompt(`Provide a description for your image ${chalk.gray('(optional)')}: `);

    const imageId = await addImageToRepo(imageName, imageDesc, imageResult.imageString, state.user);

    console.log(chalk.green('Image Added'));
    await sleep(windowTransitionDelay);

    return {
        page: 'view',
        imageId,
    };
};

/**
 * @description Fetches the image from the given source and converts it into base64
 * @param {string} source The source type of the image ("[file]path" or "url")
 * @param {string} location The specific location of the image, filepath or URL
 * @returns {string} The base64 string of the fetched image
 */
async function fetchImageAsBase64(source, location) {
    let imageString;
    let imageBuffer;

    if (source === 'path') {
        // Read the file if it's local
        try {
            imageBuffer = fs.readFileSync(location);
        } catch (err) {
            'FileReadFailedError';
        }
    } else if (source === 'url') {
        // Fetch the file if it's remote
        try {
            imageBuffer = await downloadPage(location);
        } catch (err) {
            throw 'DownloadFailedError';
        }
    } else {
        throw 'InvalidSourceError';
    }

    // Convert buffer to base64
    imageString = imageBuffer.toString('base64');

    // Return image string and buffer so you don't have to decode the base64 do display right away
    return {imageBuffer, imageString};
}

/**
 * @description Downloads an image from the provided URL and returns a buffer for it
 * @param {*} url The URL of the image
 * @returns {Buffer} A buffere for the image
 */
async function downloadPage(url) {
    // Check if the URL actually leads to an image
    if (url.match(/\.(jpeg|jpg|png)$/) === null) {
        throw 'UrlNotAnImage';
    }
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'utf-8');
}

/**
 * @description Returns the state to return to the main menu
 * @returns {Object} the state to return to the main menu
 */
function exitToMenu() {
    return {
        page: 'main',
    };
}

/**
 * @description Adds an image to the database (repository)
 * @param {string} imageName Name of the image
 * @param {string} imageDesc Description of the image
 * @param {string} imageString Base64 string for the image
 * @param {string} imageAuthor Author of the image
 * @returns {string} the id in the DB for the created image
 */
async function addImageToRepo(imageName, imageDesc, imageString, imageAuthor) {

    const imageToCreate = {
        name: imageName,
        description: imageDesc,
        author: imageAuthor,
        image: imageString,
    };

    // Add image to Images table
    const imageCreateResponse = await Images.create(imageToCreate);
    return imageCreateResponse.dataValues.id;
}
