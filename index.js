const { sequelize } = require('./helpers/dbObjects');

const pageRouter = require('./helpers/pageRouter');

(async function main() {
    // Init DB
    await sequelize.sync();

    // Initial state - login screen
    let state = {
        exitFlag: false,
        page: 'login',
    };

    do {
        // Clear the console, update state from previous page, and display the new page
        console.clear();
        state = {...state, ...(await pageRouter(state.page)(state))};

    } while (!state.exitFlag); // If state change results in exitFlag, app closes
})();


