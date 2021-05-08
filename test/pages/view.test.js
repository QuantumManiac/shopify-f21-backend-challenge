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
const view = rewire('pages/view');

describe('view', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('fetchImageFromId', () => {
        
        it('should fetch an image from a given id', () => {
            
        });

        it('should increment the view count for the image when fetching it', () => {
            
        });

        it('returns an empty object if image does not exist', () => {
            
        });
    });

    describe('decodeImageFromBase64', () => {

        it('should take a base64 string and turn it into a buffer', () => {
            
        });
        
    });
});
