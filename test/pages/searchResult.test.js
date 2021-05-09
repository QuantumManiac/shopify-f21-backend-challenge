

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
const searchResults = rewire('pages/searchResults');

describe('searchResults', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('displaySearchResults', () => {
        
        it('should display the search results for the provided term', () => {
            
        });

        it('should display random results (!random)', () => {
            
        });

        it('should display a message when no results exist', () => {
            
        });
    });

    describe('getRandomResults', () => {
        it('fetches random results', () => {
            
        });
    });

    describe('getSearchResults', () => {
    
        it('should fetch results based on the term being in the image titles', () => {
            
        });

        it('should fetch results based on the term being in the image description', () => {
            
        });

        it('should fetch results based on the term being in either the image title or description', () => {
            
        });
    });

});

