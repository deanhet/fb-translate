import login from 'facebook-chat-api';
import readlineSync from 'readline-sync';
import credentials from './credentials';
const googleTranslate = require('google-translate')(credentials.translateAPIKey);

login({
  email: credentials.fbEmail,
  password: credentials.fbPassword,
  loginOptions:{
    forceLogin: true
  }
}, function callback(err, api){
    if(err) return console.error(err);

    api.setOptions({listenEvents: true});

    var stopListening = api.listen(function(err, event) {
        if(err) return console.error(err);
        switch(event.type) {
          case "message":
            // if(event.body === '/stop') {
            //   api.sendMessage("Goodbye...", event.threadID);
            //   return stopListening();
            // }
            api.markAsRead(event.threadID, function(err) {
              if(err) console.log(err);
            });
            console.log(event.body);
            googleTranslate.translate(event.body, 'ro', 'en', function(err, translation){
              console.log(translation.translatedText + '\n');
            });
            let test = readlineSync.question('> ');
            console.log(test);
            googleTranslate.translate(test, 'en', 'ro', function(err, translation){
              console.log(translation.translatedText + '\n');
              api.sendMessage("TEST BOT: " + translation.translatedText, event.threadID);
            });
            break;
          case "event":
            console.log(event);
            break;
        }
    });
});

