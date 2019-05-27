# andybot
A Twitch node.js bot designed to run commands (!uptime, etc.).  Also has a frontend in Vue.js for command permissions and watching chat.
___
** Before you get started, you will need: **
* Node (latest version works fine), used for the chat bot
* xampp (or another local hosting server), used for the frontend
___
** How to install the chat bot: **
1. Download the files to a directory.  Easiest option is to download as zip, then unzip it to a folder of your choice.
2. Navigate in the terminal to the directory you created.  Type in `npm install` to download all packages needed.
3. Goto the config folder.  Change `dummy-server-vars.js` to just `server-vars.js` and imput your bot username, password, and channel name.  You may need to make a new Twitch developer account for this.
4. Go to the main directory and type in `node server.js`.  If everything goes well, you should see the console pop up and have it wait for actions.
5. Experiment with the different commands!  Write your own!

** Code Points of Interest: **

* `command-permissions`: This is where each command has a variable for its ability to be used.  If you add/remove commands, also add/remove an appropriate variable.  You can either manually set permissions here or change them in the front end.
* `//add your commands here`: After this comment is the processing loop.  First, each message gets checked for length and if commands are on cooldown.  Then they're checked for content and if a match is found, an appropriate action happens.  `clieent.send` will have your bot send a meesage in chat.  Make sure to respect the cooldown mechanics by locking it in your actions and using `setTimeout` to turn off the cooldown.
* `/** END server setup **/`: Marks the end of the bot code.  The code after is used for the front end if you choose to use it.
___
** How to install the frontend: **
1. (if needed) Move the folder to a directory you can access through your hosting server.  In XAMPP, it is likely `xampp/htdocs/`.
2. Open the said directory in your browser to make sure it works.
3. Open up `js/app.js` and change `this.channel="sketchspace"` to whatever your channel to be.
4. (optional) Go to `server.js` and change your port number from 3000 to whatever you want.  Also in `js/app.js`, go near the bottom and change `127.0.0.1:3000` to whatever you set your new port number.  Verify your changes work.
___
** Future Plans: **

I want to make this run off a Raspberry PI 3 with a touch screen by my streaming setup.  So whenever I go live, I press a few buttons, then I have a small screen by my setup to make changes.
___
** Contact: **

Send all questions/comments to `olindgallet@olingallet.com`
