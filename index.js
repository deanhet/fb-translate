import login from 'facebook-chat-api';
import readlineSync from 'readline-sync';
import credentials from './credentials';
import moment from 'moment';

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

    api.setOptions({
      listenEvents: true,
      logLevel: 'error'
    });
    let friendsList = [];

  api.getFriendsList(function(err, data) {
    if(err) return console.error(err);
    friendsList = data;
  });

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
            console.log(`${friendsList.find((friend) => friend.userID == event.senderID).fullName} : ${moment().format('hh:mm:ss')}`)
            console.log(`Original: ${event.body}`);
            console.log(`Translation: ${await translate(credentials.fromLanguage, credentials.toLanguage, event.body)}`);
            let response = await getInput();
            api.sendMessage(await translate(credentials.toLanguage, credentials.fromLanguage, response), event.threadID);
            break;
          case "event":
            console.log(event);
            break;
        }
    });
});

