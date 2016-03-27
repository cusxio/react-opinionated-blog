import path from 'path';
import fs from 'fs';
import url from 'url';
import { mkdirP as mkdirPCallback } from 'mkdirp';
import { promisify } from 'bluebird';

const mkdirP = promisify(mkdirPCallback);
const writeFile = promisify(fs.writeFile);

export default (outputDir, [pageUrl, response]) => {
    const pathname = url.parse(pageUrl).pathname;
    const filename = path.join(outputDir, pathname, 'index.html');
    return mkdirP(path.dirname(filename))
        .then(() => writeFile(filename, response))
        .then(() => filename);
};
