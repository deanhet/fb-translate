import login from 'facebook-chat-api';
import readlineSync from 'readline-sync';
import credentials from './credentials';
const googleTranslate = require('google-translate')(credentials.translateAPIKey);

async function getInput(){
  let userInput = await readlineSync.question('> ');
  return userInput;
}

async function translate(fromLanguage, toLanguage, input){
  return new Promise(async function(resolve, reject){
    try{
      await googleTranslate.translate(input, fromLanguage, toLanguage, function(err, translation){
        if(err){
          throw new Error(err);
        }
        resolve(translation.translatedText);
      })
    } catch(error){
      console.log(error);
      reject(error);
    }
  })
}

login({
  email: credentials.fbEmail,
  password: credentials.fbPassword,
  loginOptions:{
    forceLogin: true
  }
}, function callback(err, api){
    if(err) return console.error(err);

    api.setOptions({listenEvents: true});

    var stopListening = api.listen(async function(err, event) {
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
            console.log(await translate('ro', 'en', event.body));
            let response = await getInput();
            api.sendMessage(await translate('en', 'ro', response), event.threadID);
            break;
          case "event":
            console.log(event);
            break;
        }
    });
});

