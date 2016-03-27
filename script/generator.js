#!/usr/bin/env babel-node

import Promise from 'bluebird';
import chalk from 'chalk';
import fetchPage from './utils/fetchPage';
import writePage from './utils/writePage';

const [serverUrl, outputDir] = process.argv.slice(2);

if (!serverUrl || !outputDir) {
    console.log(`${chalk.red('Error')}, you need to specify a HOST and a TARGET directory.`);
    process.exit(1);
}

function generatePage(page) {
    return fetchPage(serverUrl, page)
        .then(([pageUrl, response]) => {
            return writePage(outputDir, [pageUrl, response]);
        })
        .catch(([pageUrl, error]) => {
            console.log(`${chalk.red('Error')} on url ${pageUrl} with error message ${error}`);
        });
}

const routes = ['/'];

Promise.all(routes.map(generatePage))
    .then(filename => {
        console.log(`Generated ${chalk.yellow(filename)}`);
    })
    .catch(console.error.bind(console));
