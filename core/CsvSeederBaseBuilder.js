const jsonToCsvConverter = require('json-2-csv');
const fs = require('fs');
const path = require('path');
const paths =  require('../utils/paths');
const { deepStrictEqual } = require('assert');


class CSVSeederBaseBuilder {

    __files = [];

    constructor(files) {
        this.__files = files;
    }
    
    async save(folderName) {
        await new Promise(async (resolve,reject) => {
            if(folderName) {
              await new Promise((resolve,reject) => {
                const isPathExists = fs.existsSync(path.join(paths.basePath,folderName));
                if(!isPathExists) {
                    fs.mkdirSync(path.join(paths.basePath,folderName));
                }
                resolve(true);
            });   
        }
            const writePromises = [];
            this.__files.forEach((file) => {
                jsonToCsvConverter.json2csv(file.content, (err,csv) => {
                    if(err) {
                        reject(err);
                        return;
                    }
                    const writePromise = new Promise((resolve,reject) => {
                        let saveFileName = [paths.basePath,file.filename];
                        if(folderName) {
                            saveFileName = [paths.basePath,folderName,file.filename];
                        }
                        fs.writeFile(path.join(...saveFileName),csv,(err) => {
                            if(err) {
                                reject(err);
                                return;
                            }
                            resolve(true);
                        });
                    });
                    writePromises.push(writePromise);
                })
            });
            await Promise.all(writePromises);
            resolve(true);
        });
    }

}

module.exports = CSVSeederBaseBuilder;