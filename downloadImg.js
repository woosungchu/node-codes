var fs = require('fs');
var https = require('https');
var responses = [];

for(var i =1; i < 11; i++){
  var url = `https://ezportal.bizmeka.com/avataImages/colorticon/autumn${i}.jpg`
  var target = `C:/Users/LG/Pictures/colorticon3/autumn${i}.jpg`
  var file = fs.createWriteStream(target);
  console.log(url);

  var callback = (function(f){
    return function(response){
	    console.log(f.path)
    	responses.push({'response':response,'file':f});

      if(responses.length == 10){
        responses.forEach(function(a){
          a['response'].pipe(a['file']);
        })
      }
    }
  })(file)

  var request = https.get(url, callback);
}
