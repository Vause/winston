/**
 * common.js: Internal helper and utility functions for winston.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

const path = require('path');
const fs = require('fs');


module.exports = (dirPath, fileName) => {
        if (!fileName) return 0;

        const filePlainName = path.parse(fileName).name;

        const existingFileNumbers = [];
        const filesArr = fs.readdirSync(dirPath, {withFileTypes: true})
        .filter(file => !file.isDirectory())
        .map(file => file.name);

        const fileSuffixes = filesArr.map(e => e.match(`${filePlainName}*?([0-9]+)`))
        fileSuffixes.forEach(fileSuffix => {
                if (fileSuffix) existingFileNumbers.push(parseInt(fileSuffix[1]));
        })

        return existingFileNumbers.length ? Math.max(...existingFileNumbers) : 0;
};