const CSVSeederBaseBuilder = require('./CsvSeederBaseBuilder');
class CSVUpdateSeederBuilder extends CSVSeederBaseBuilder {
    
    constructor(files) {
        super(files);
    }
    
    updateFiles(fileNamesMapping) {
        if( !(fileNamesMapping !== undefined && 
            fileNamesMapping.length && 
            fileNamesMapping.filter((data) => data.hasOwnProperty('name') && 
            data.hasOwnProperty('callback') && 
            typeof(data.name) === 'string' && 
            typeof(data.callback) === 'function').length ===  fileNamesMapping.length) ) {
                throw new Error('Update file function takes array of object which should contain name and callback properties.')
            }
        this.__files = this.__files.map((csvJSONData) => {
            const fileNamesMappingData = fileNamesMapping.find((mapping) => mapping.name === csvJSONData.filename);
            if(fileNamesMappingData && csvJSONData.content) {
                csvJSONData.content = csvJSONData.content.map((row) => {
                    return fileNamesMappingData.callback(row);
                })
            } 
        return csvJSONData;
        });
        return this;
    }

 
}


module.exports = CSVUpdateSeederBuilder;
 