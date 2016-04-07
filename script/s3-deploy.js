#!/usr/bin/env babel-node

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import mime from 'mime';
import aws from 'aws-sdk';
import glob from 'glob';
import minimist from 'minimist';
import flatten from 'lodash/flatten';
import Promise, { promisify } from 'bluebird';

const argv = minimist(process.argv.slice(2));
const readFilePromise = promisify(fs.readFile);
const readDirPromise = promisify(fs.readdir);

const options = {
    cwd: argv.cwd || '',
    bucket: argv.bucket,
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
            console.log('ERR UPLOAD');
        }
        console.log('Uploaded');
    });
}

function sync(client, S3, fileObject) {
    const params = Object.assign({}, {
        IfNoneMatch: hex(fileObject.contents),
        IfUnmodifiedSince: fileObject.stat.mtime,
    }, buildKeyParam(fileObject), S3);

    client.headObject(params, err => {
        if (err && (err.statusCode === 304 || err.statusCode === 412)) {
            console.log(`Unmodified - ${params.Key}`);
            return;
        }

        upload(client, S3, fileObject);
    });
}

function readFile(filePath) {
    return new Promise(resolve => {
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            readFilePromise(filePath)
                .then(data => {
                    resolve({
                        stat,
                        contents: data,
                        base: path.join(process.cwd(), options.cwd),
                        path: path.join(process.cwd(), filePath),
                    });
                });
        } else if (stat.isDirectory()) {
            readDirPromise(filePath)
                .then(files => {
                    files.forEach(filename => {
                        readFile(path.join(filePath, filename));
                    });
                });
        }
    });
}

function deploy(globbedFilesPath, S3) {
    aws.config.loadFromPath(path.join(process.cwd(), 'config', 'aws.json'));

    const client = new aws.S3();

    globbedFilesPath.forEach(filePath => {
        readFile(filePath)
            .then(fileObject => {
                sync(client, S3, fileObject);
            });
    });
}

const globbedFilesPath = flatten(argv._
    .filter(Boolean).map(function (pattern) {
        return glob.sync(pattern);
    }));

deploy(globbedFilesPath, {
    Bucket: options.bucket,
});
