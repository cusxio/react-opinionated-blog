#!/usr/bin/env babel-node
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import chalk from 'chalk';
import fetchPage from './utils/fetchPage';
import writePage from './utils/writePage';

const [serverUrl, outputDir] = process.argv.slice(2);

if (!serverUrl || !outputDir) {
    console.log(`    ${chalk.red('✖ Error')}, you need to specify a HOST and a TARGET directory.`);
    process.exit(1);
}

function generatePage(page) {
    return fetchPage(serverUrl, page)
        .then(([pageUrl, response]) => {
            return writePage(outputDir, [pageUrl, response]);
        })
        .catch(([pageUrl, error]) => {
            console.log(`    ${chalk.red('✖ Error')} on url ${pageUrl} with error message ${error}`);
        });
}

const json = fs.readFileSync(path.join(__dirname, '..', '_tmp', 'data.json'));

let routes = [].concat.call(['/', '/blog'], Object.keys(JSON.parse(json)));

Promise.map(routes, route => {
    return generatePage(route);
})
.then(() => {
    console.log(`\n    ${chalk.bold.green('✔ Generation Complete.')}`);
})
.catch(console.error.bind(console));
