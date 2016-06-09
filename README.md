# fb-translate
A simple script that hooks into facebook and google translate api's. Allowing you to speak to different languages on the fly!

Example: 
```
 Friend: Sends you a message in Romanian
 You: Recieve message translated to English 
 You: Send reply in English 
 Friend: Recieves your reply in Romanian
```
## How to use ##
- Install `node` and `npm`
- Change to that directory and run `npm install`
- Open `credentials.js`, you'll need to input your facebook username, password, a google-translate API key and the languages you're going to translate between.
- Run `npm start`
- Wait for somebody to message you.
- Have facebook open in a tab, just to keep an eye on what the script is sending/receiving

## Limitations ##
- The script currently waits for someone to message you first. It's all purely reactive right now.
- If you chat through the script, it will translate for everyone you chat to.
- It will not tell you who has started speaking to you. Just comes up with the message.
- You may have to disable two factor authentication/login review on facebook to get login working.
- You will reply to whoever has messaged you, conversations are threaded as they come in.

This is a proof of concept more than anything else, something I knocked together in about an hour. I'd love to come back and give this more maintenance in the future. I just have to find the time.
