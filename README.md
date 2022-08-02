# csv-seeder

const CsvSeeder = require('./core/CsvSeeder');

## Example to update existing csv files
```
CsvSeeder
.loadFile('queue')
.then((builder) => {
    builder
    .updateFiles([
        {
            name: 'data.csv',
            callback: (data) => {
                data.test = "i am test";
            }
        }
    ]
    )
    .save('root');
})
```

## Example to create new csv files
 
 ```
 CsvSeeder
 .createFile()
 .addFile('test.csv',[
     {id: 1, name: 'lame', game: 'to'},
     {id: 1, name: 'lame', game: 'to',test:'hjhjg'},
 ])
 .addFiles(
     [
         {
         filename: 'test2.csv',
         content: [
             {id: 1, name: 'lame', game: 'to'},
             {id: 1, name: 'lame', game: 'to',test:'hjhjg'}
         ]
         },
         {
         filename: 'test3.csv',
         content: [
             {id: 1, name: 'lame', game: 'to'},
             {id: 1, name: 'lame', game: 'to',test:'hjhjg'}
         ]
         }
     ]
 )
 .save('testdir');
```

 ## Detail Documentation is comming soon.
