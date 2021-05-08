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
const dbObjects = rewire('helpers/dbObjects');

describe('dbObjects', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });
    
    it('should successfully initialize sequelize', () => {
        
    });

    it('should successfully create the Images table', () => {
        
    });

    it('should successfully create the Users table', () => {
        
    });

});


