const fs = require('fs');

let pages = {};

// Get all the pages from the ./pages directory and put them into an object for easy access
const pagesFolder = fs.readdirSync('./pages');
for (const page of pagesFolder) {
    pages[page.replace('.js', '')] = require(`../pages/${page}`);
}

module.exports = function(pageRoute) {
    return pages[pageRoute];
};
