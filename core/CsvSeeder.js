const CSVUpdateSeederBuilder = require('./CsvUpdateSeederBuilder');
const CSVCreateSeederBuilder = require('./CsvCreateSeederBuilder');
const paths =  require('../utils/paths');
const fs = require('fs');
const  csv = require('csvtojson');
const path = require('path');

class CSVSeeder {

    __fileQueuePath = null;
    __filenames = null;
    __jsonFiles = null;
    
    constructor() {
       throw new Error('Instance creation of CSVReader is not allowed');
    }

    static  async loadFile(fileQueuePath) {
        if(typeof(fileQueuePath) !== "string" || !fileQueuePath) {
            throw new Error('Folder name should be string and cannot be any falsy value');
        }
        if(fileQueuePath) {
            const isExists = await new Promise((resolve,reject) => {
              resolve(fs.existsSync(path.join(paths.basePath,fileQueuePath)));
          });
          if(!isExists) {
            throw new Error('Folder do not exists');
          }   
        }
       this. __fileQueuePath = path.join(paths.basePath,fileQueuePath);
       const promiseQueue = [];
       await new Promise((resolve,reject) => {
           fs.readdir(this.__fileQueuePath,(err,res) => {
               if(err) {
                   reject(err);
                   return;
               }
               this.__filenames = res;
               res.forEach(async (filename) => {
                   promiseQueue.push(csv().fromFile( path.join(this.__fileQueuePath,filename)));            
               });
               resolve(true);
           });
       });
       const jsonCsvs = await Promise.all(promiseQueue);
       this.__jsonFiles = jsonCsvs;
       return new CSVUpdateSeederBuilder(this.__jsonFiles.map((content,i) => {
           return {
               filename: this.__filenames[i],
               content:content
           }
       }))
    }

    static createFile() {
        return new CSVCreateSeederBuilder();
    }



}

module.exports = CSVSeeder;