var fs = require('fs');
const exec = require('child_process').exec;


function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }

        onFileContent(filename, content);
      });
    });
  });
}

const colorticonDir = 'C:/Users/LG/Pictures/colorticon2/';

readFiles(colorticonDir,function(filename,content){
  var file = filename.split('.');
  console.log(filename);
  if(file[1] == 'png'){
    console.log('converting....')
    const child = exec('magick convert '+colorticonDir+file[0]+'.png '+colorticonDir+file[0]+'.jpg',
        (error, stdout, stderr) => {
            // console.log(`stdout: ${stdout}`);
            // console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
    });
  }

},function(error){
  console.log('error ####################')
})
