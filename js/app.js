var titleData = {
	title:'Andybot 4 Twitch',
};

var bus = new Vue();

/**
 * Initial copy
 */
Vue.component('logincopy', {
	template: `<div>Andybot is a Twitch robot designed using Vue.js for the frontend and Node.js with the Slate IRC library for the backend.  It is a learning
				project to understand these technologies for future use in projects.</div>`
});

/**
 * Form for logging in.
 * Contains a field for channel to join.
 */
Vue.component('loginform', {
	template: `<div>
				  <button type="button" v-on:click="login();" class="btn btn-primary login-button" >Login sketchspace</button>
				</div>
				`,
	data() {
		return { 
			channel: ""
		}
	},
	methods: {
		updateChannel() { this.channel = "sketchspace" },
		broadcast() { bus.$emit('login', this.channel); },
		login() { this.channel="sketchspace"; setTimeout(this.broadcast, 100); page('login'); }
	}
});

/**
 * Chat Window
 */
Vue.component('chatview', {
	template: `<iframe frameborder="0"
        scrolling="no"
        id="chat_embed"
        :src="channelLink"
        height="400"
        width="620"></iframe>`,
	data() {
		return {
			channelLink: ""
		}
	},
	created: function() {
		bus.$on('login', channel => { this.updateChannel(channel); });
	},
	
	methods: 
	{
		updateChannel(channel){
			this.channelLink = "https://www.twitch.tv/embed/" + channel + "/chat";
		}
	}
});

/**
 * Bot Options Toggles
 */
Vue.component('botoptions', {
	template: `<div>
				<ul class="nobullet">
				   <li class="toggle-line">
				     <span class="toggle-label">!profile command:</span><button type="button" v-on:click="toggleProfileCommand();" class="btn btn-primary toggle-button" >{{ profileState }}</button>
				   </li>
				   <li class="toggle-line">
				     <span class="toggle-label">!uptime command:</span><button type="button" v-on:click="toggleUptimeCommand();" class="btn btn-primary toggle-button" >{{ uptimeState }}</button>
				   </li>
				   <li class="toggle-line">
				     <span class="toggle-label">!futurebuilds command:</span><button type="button" v-on:click="toggleFutureBuildsCommand();" class="btn btn-primary toggle-button" >{{ futureBuildsState }}</button>
				   </li>
				</ul>
				</div>`,
	data() {
		return { 
			profileState: "On",
			uptimeState: "On",
			futureBuildsState: "On"
		}
	},
	methods: {
		toggleProfileCommand(){
			if (this.profileState === "On"){
				this.profileState = "Off";
			} else {
				this.profileState = "On";
			}
			bus.$emit('toggleprofile', { profileState: this.profileState });
		},
		
		toggleUptimeCommand(){
			if (this.uptimeState === "On"){
				this.uptimeState = "Off";
			} else {
				this.uptimeState = "On";
			}
			bus.$emit('toggleuptime', { uptimeState: this.uptimeState });
		},
		
		toggleFutureBuildsCommand(){
			if (this.futureBuildsState === "On"){
				this.futureBuildsState = "Off";
			} else {
				this.futureBuildsState = "On";
			}
			bus.$emit('togglefuturebuilds', { futureBuildsState: this.futureBuildsState });
		}
	}
});

/**
 * Header Bar
 */
Vue.component('loginheaderbar', {
	template: `<div class="edge-bar">
				Andybot -- a Twitchbot used for basic functions
				</div>
				`
});

/**
 * Chat Header Bar
 */
Vue.component('chatheaderbar', {
	template: `<div class="edge-bar">
				Current channel: #{{ channel }}
			   </div>`,
	data() {
		return {
			channel: ""
		}
	},
	created: function() {
		bus.$on('login', channel => { this.updateChannel(channel); });
	},
	
	methods: 
	{
		updateChannel(channel){
			this.channel = channel;
		}
	},
	destroyed: function(){
		bus.$destroy('login');
	}
});

/**
 * Footer Bar
 */
Vue.component('footerbar', {
	template: `<div class="edge-bar">
					<a href="http://www.olingallet.com">Made by Olin Gallet, September 2017 -- Updated May 2019</a>
				</div>
				`,
});

var vm = new Vue({
	el: 'head',
	data: titleData
});

var vm2 = new Vue({
	el: '#body',
	data: {
		headerbar: 'loginheaderbar',
		leftpanel: 'logincopy',
		rightpanel: 'loginform',
		footerbar: 'footerbar',
	},
	created: function() {
		bus.$on('toggleprofile', profileState => { $.post({ url: 'http://127.0.0.1:3000', data: JSON.stringify(profileState), contentType: 'text/plain; charset=utf-8', datatype: 'json', async: true }) });
		bus.$on('toggleuptime', uptimeState => {$.post({ url: 'http://127.0.0.1:3000', data: JSON.stringify(uptimeState), contentType: 'text/plain; charset=utf-8', datatype: 'json', async: true }) });
		bus.$on('togglefuturebuilds', futureBuildsState => {$.post({ url: 'http://127.0.0.1:3000', data: JSON.stringify(futureBuildsState), contentType: 'text/plain; charset=utf-8', datatype: 'json', async: true }) });
	},
	destroyed: function(){
		bus.$destroy('toggleprofile');
		bus.$destroy('toggleuptime');
		bus.$destroy('togglefuturebuilds');
	}
});