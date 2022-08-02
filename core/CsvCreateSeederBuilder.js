const CSVSeederBaseBuilder = require('./CsvSeederBaseBuilder');
class CsvCreateSeederBuilder extends CSVSeederBaseBuilder {
    

    constructor() {
        super([]);
    }

    addFile(name,content) {
        if(typeof(name) !== 'string' || !content.length) {
         throw new Error('Invalid parameters only string is allowed at file name and content must be array of object')
        }
        this.__files.push({
            filename:name, 
            content
        })
        return this;
    }

    addFiles(files) {
        if(!files.length || 
            !(files.filter((data) => data.hasOwnProperty('filename') && 
        data.hasOwnProperty('content') && 
        typeof(data.filename) === 'string' && 
        data.content.length !== 0).length ===  files.length) ) {
            throw new Error('Invalid parameters please only array is allowed with the object contains filename key as string and content should be array of objects')
        }
        this.__files = [...this.__files, ...files];
        return this;
    }

 
}


module.exports = CsvCreateSeederBuilder;
 