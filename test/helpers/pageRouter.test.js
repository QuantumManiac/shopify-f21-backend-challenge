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
const pageRouter = rewire('helpers/pageRouter');

describe('pageRouter', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should populate the pages from the directory', () => {
        
    });

    it('should return the page for the requested route', () => {
        
    });

});
