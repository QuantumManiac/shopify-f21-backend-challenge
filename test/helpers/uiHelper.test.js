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
const uiHelper = rewire('helpers/uiHelper');

describe('uiHelper', () => {

    let consoleLogStub;

    beforeEach(() => {
        // Override config variables for testing
        uiHelper.__set__('windowWidth', 64);

        consoleLogStub = sandbox.stub(console, 'log');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('drawHeading', () => {
        it('should print a properly formatted heading', () => {
            uiHelper.drawHeading('TEST');

            expect(consoleLogStub).to.have.been.calledWith('\u001b[90m================================================================\u001b[39m\n\u001b[1mTEST\u001b[22m\n\u001b[90m================================================================\u001b[39m\n');
        });

        it('should uppercase the text string if required', () => {
            uiHelper.drawHeading('test');

            expect(consoleLogStub).to.have.been.calledWith('\u001b[90m================================================================\u001b[39m\n\u001b[1mTEST\u001b[22m\n\u001b[90m================================================================\u001b[39m\n');
        });
    });

    describe('drawSmallerHeading', () => {
        it('should print a properly formatted smaller heading', () => {
            uiHelper.drawSmallerHeading('TEST');
            expect(consoleLogStub).to.have.been.calledWith('\u001b[90m=============================\u001b[39m \u001b[1mTEST\u001b[22m \u001b[90m=============================\u001b[39m');
        });

        it('should uppercase the text string if required', () => {
            uiHelper.drawSmallerHeading('test');
            expect(consoleLogStub).to.have.been.calledWith('\u001b[90m=============================\u001b[39m \u001b[1mTEST\u001b[22m \u001b[90m=============================\u001b[39m');
        });
    });

    describe('drawDivider', () => {
        it('should print a divider', () => {
            uiHelper.drawDivider();
            expect(consoleLogStub).to.have.been.calledWith('\u001b[90m================================================================ \u001b[39m\n\u001b[90m\u001b[39m');
        });
    });

    describe('drawOptionsMenu', () => {
        it('should print an options menu from the given array', () => {
            const drawOptionsMenu = uiHelper.__get__('drawOptionsMenu');

            const testOptions = ['foo', 'bar', 'baz'];

            drawOptionsMenu(testOptions);

            expect(consoleLogStub).to.have.been.callCount(5);
            // TODO: Asserting each call
        });
    });

    describe('optionHandler', () => {

        it('should return the state of the chosen option', () => {
            
        });

        it('should reprompt if an invalid option was chosen', () => {
            
        });

    });

    describe('textAbstract', () => {

        it('should not modify a string under the max length', () => {

            expect(uiHelper.textAbstract('test', 16)).to.deep.equal('test');
        });

        it('should modify a string over the max length', () => {

            expect(uiHelper.textAbstract('test test test test test', 16)).to.deep.equal('test test test...');

        });

        it('should turn a very long single word into ellipses', () => {

            expect(uiHelper.textAbstract('teeeeeeeeeeeeeeeeeeeeeest', 16)).to.deep.equal('...');

        });

    });

    describe('sleep', () => {
        
        it('should sleep for the set time', () => {
            
        });

    });
});
