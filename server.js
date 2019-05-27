'use strict';
const SERVERVARS = require('./config/server-vars');

/** BEGIN Twitch Server **/
const USERNAME = SERVERVARS.username();
//https://twitchapps.com/tmi/ < go here to make a token.
const PASSWORD = SERVERVARS.password();
const CHANNEL  = SERVERVARS.channel();
const IRC  = require('slate-irc');
const NET  = require('net');
const HTTP = require('http');
const FS   = require('fs');

function pong(){
  return function(IRC){
    IRC.on('data', function(msg){
      if ('PING' != msg.command) return;
      IRC.write('PONG :' + msg.trailing);
    });
  }
}

let commandPermissions = {
  profile: true,
  uptime: true,
  futureBuilds: true,
  onCooldown: false,
  cooldownSeconds: 5
}
 
const stream = NET.connect({
  port: 6667,
  host: 'IRC.twitch.tv'
});
 
let client = IRC(stream);
client.use(pong());

const moment = require('moment');
let startTime = moment();

console.log('*****');
console.log("Logging into Twitch. . ."); 
client.pass(PASSWORD);
client.nick(USERNAME);
client.user(USERNAME, USERNAME);
client.join(CHANNEL);
client.send(CHANNEL, 'Andybot reporting for duty!');
console.log("Successfully logged in at " + startTime.format('HH:mm a') + '.');
console.log('*****');

//add your commands here
client.on('data', function(msg){
let words = msg.trailing.split(" ");
if (words.length > 0  && !commandPermissions.onCooldown){
    var currentTime = moment();
    if (words[0] === "!profile" && commandPermissions.profile){
        commandPermissions.onCooldown = true;
        client.send(CHANNEL, "https://www.pathofexile.com/account/view-profile/sketchspace/characters");
        console.log("<" + currentTime.format("HH:mm") + ">POE Profile requested.");
        setTimeout(function(){
			console.log("<" + currentTime.format("HH:mm") + ">Commands are off cooldown.");
			commandPermissions.onCooldown = false;
        }, commandPermissions.cooldownSeconds * 1000);
    } else if (words[0] === "!uptime" && commandPermissions.uptime){
        commandPermissions.onCooldown = true;
        client.send(CHANNEL, "Stream started at: " + startTime.format('HH:mm a') + ".");
        console.log("<" + currentTime.format("HH:mm") + ">Uptime requested.");
        setTimeout(function(){
			console.log("<" + currentTime.format("HH:mm") + ">Commands are off cooldown.");
			commandPermissions.onCooldown = false;
      }, commandPermissions.cooldownSeconds * 1000);
	}else if (words[0] === "!futurebuilds" && commandPermissions.futureBuilds){
        commandPermissions.onCooldown = true;
        client.send(CHANNEL, "Future Builds for Legacy > https://pastebin.com/LEAFq6pu");
        console.log("<" + currentTime.format("HH:mm") + ">Future Builds requested.");
        setTimeout(function(){
			console.log("<" + currentTime.format("HH:mm") + ">Commands are off cooldown.");
			commandPermissions.onCooldown = false;
      }, commandPermissions.cooldownSeconds * 1000);
    } 
  }
});
/** END Twitch Server **/

/** BEGIN Server Setup **/

let server = HTTP.createServer( function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost");
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	
  if (req.method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = JSON.parse(body);
      console.log("[" + moment().format("HH:mm") + "] POST received.");
      if (body['profileState'] === "Off"){
        console.log("!profile command turned Off.");
        commandPermissions.profile = false;
      } else if (body['profileState'] === "On"){
        console.log("!profile command turned On.");
        commandPermissions.profile = true;
      } else if (body['uptimeState'] === "Off"){
        console.log("!uptime command turned Off.");
        commandPermissions.uptime = false;
      } else if (body['uptimeState'] === "On"){
        console.log("!uptime command turned On.");
        commandPermissions.uptime = true;
      } else if (body['futureBuildsState'] === "Off"){
        console.log("!futureBuilds command turned Off.");
        commandPermissions.futureBuilds = false;
      } else if (body['futureBuildsState'] === "On"){
        console.log("!futureBuilds command turned On.");
        commandPermissions.futureBuilds = true;
      }
    });
		
    req.on('error', (err) => {
      console.log('[' + moment().format("HH:mm") + '] Error during received POST: ' + err.stack);
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('post received');
  }
});

let port = 3000;
let host = '127.0.0.1';
server.listen(port, host);
console.log('*****');
console.log('Starting up control-command server. . .');
console.log('Control-command server listening at HTTP://' + host + ':' + port + " at " + moment().format('HH:mm a') + '.');
console.log('*****');
/** END Server Setup **/

console.log('*****');
console.log('[] denote server messages, <> denote chat messages.');
console.log('*****');