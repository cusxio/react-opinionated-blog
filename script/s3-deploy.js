#!/usr/bin/env babel-node

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import mime from 'mime';
import AWS from 'aws-sdk';
import chalk from 'chalk';
import glob from 'glob';
import minimist from 'minimist';
import flatten from 'lodash/flatten';
import { promisify } from 'bluebird';

const argv = minimist(process.argv.slice(2));
const readFilePromise = promisify(fs.readFile);
const readDirPromise = promisify(fs.readdir);

const options = {
    cwd: argv.cwd || '',
    bucket: argv.bucket,
    region: argv.region || 'ap-southeast-1',
};

function contentType(src) {
    var type = mime.lookup(src).replace('-', '');
    var charset = mime.charsets.lookup(type, null);

    if (charset) {
        type += '; charset=' + charset;
    }
    return type; // returns "text/plain; charset=UTF-8"
}

function hex(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

function base64(data) {
    return crypto.createHash('md5').update(data).digest('base64');
}

function buildKeyParam(fileObject) {
    return {
        Key: fileObject.path.replace(fileObject.base, '').replace(/^\//, ''),
    };
}

function buildUploadParams(fileObject) {
    return {
        ContentMD5: base64(fileObject.contents),
        Body: fileObject.contents,
        ContentType: contentType(fileObject.path),
        CacheControl: 'max-age=0, no-cache',
    };
}

function upload(client, S3, fileObject) {
    const params = Object.assign({}, {
        ACL: 'public-read',
    }, buildKeyParam(fileObject), buildUploadParams(fileObject), S3);

    client.putObject(params, err => {
        if (err) {
            console.log(`    ${chalk.red(`✖ Error: ${err} (${err.stack}})`)}`);
        }
        console.log(`    ${chalk.green.bold(`✔ Uploaded. ${params.Bucket}/${params.Key}`)}`);
    });
}

function sync(client, S3, fileObject) {
    const params = Object.assign({}, {
        IfNoneMatch: hex(fileObject.contents),
        IfUnmodifiedSince: fileObject.stat.mtime,
    }, buildKeyParam(fileObject), S3);

    client.headObject(params, err => {
        if (err && (err.statusCode === 304 || err.statusCode === 412)) {
            console.log(`    ${chalk.yellow.bold(`Unmodified: ${params.Key}`)}`);
            return;
        }

        upload(client, S3, fileObject);
    });
}

function readFile(filePath, cb) {
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
        readFilePromise(filePath)
            .then(data => {
                cb({
                    stat,
                    contents: data,
                    base: path.join(process.cwd(), options.cwd),
                    path: path.join(process.cwd(), filePath),
                });
            })
            .catch(err => {
                console.log(`    ${chalk.red(`✖ Error: ${err}`)}`);
            });
    } else if (stat.isDirectory()) {
        readDirPromise(filePath)
            .then(files => {
                files.forEach(filename => {
                    readFile(path.join(filePath, filename), cb);
                });
            })
            .catch(err => {
                console.log(`    ${chalk.red(`✖ Error: ${err}`)}`);
            });
    }
}

function deploy(globbedFilesPath, AWSOpt, S3) {
    AWS.config.update(AWSOpt);

    const client = new AWS.S3();

    globbedFilesPath.forEach(filePath => {
        readFile(filePath, function cb(fileObject) {
            sync(client, S3, fileObject);
        });
    });
}

const globbedFilesPath = flatten(argv._
    .filter(Boolean).map(function (pattern) {
        return glob.sync(pattern);
    }));

console.log(`    ${chalk.green.bold('Deploying files to S3 Bucket: %s')}`, options.bucket);

deploy(globbedFilesPath, {
    region: options.region,
}, {
    Bucket: options.bucket,
});
