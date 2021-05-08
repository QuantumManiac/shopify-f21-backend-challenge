/* eslint-disable */
// Allow absolute paths rather than relative paths from test file
require('rootpath')();

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const rewire = require('rewire');

chai.use(require('chai-as-promised'));

// Create sandbox for stubbing
const sandbox = sinon.createSandbox();

// Get file under test
const add = rewire('pages/add');

describe('add', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('fetchImageAsBase64', () => {
        
        it('should fetch a local image', () => {
            
        });

        it('should throw an error due to file read fail', () => {
            
        });

        it('should fetch a url image', () => {
            
        });

        it('should throw an error due to download fail', () => {
            
        });

        it('should throw an error due to invalid image source', () => {
            
        });

    });

    describe('downloadPage', () => {

        it('should return a buffer from a downloaded image', () => {
            
        });

        it('should throw an error if the url is invalid for an image', () => {
            
        });
    });

    describe('exitToMenu', () => {
        
        it('should return the state to return to the main menu', () => {
            
        });
    });

    describe('addImageToRepo', () => {
        
        it('should add an image to the db successfully', () => {
            
        });

        it('should return the id for the image after being added to the db', () => {
            
        });
    });
});
