/* eslint-disable */
// Allow absolute paths rather than relative paths from test file
require('rootpath')();

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const rewire = require('rewire');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

// Create sandbox for stubbing
const sandbox = sinon.createSandbox();

// Get file under test
const authHelper = rewire('helpers/authHelper');

describe('authHelper', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('registerUser', () => {

        it('should reprompt for username if already exists', () => {

        });

        it('should reprompt for password if they do not match', () => {

        });

        it('should create a new db entry with the right object passed', () => {

        });

        it('should return the username on successful register', () => {

        });

    });

    describe('checkIfUsernameExists', () => {

        beforeEach(() => {

        });

        it('should return true if username found in db', () => {

        });

        it('should return false if username not found in db', () => {

        });

    });

});


