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
const login = rewire('pages/login');

describe('login', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

});
