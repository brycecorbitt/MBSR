# MBSR
A platform to provide resources for Mindfullness Based Stress Reduction from research conducted at UMass Medical's Center for Mindfullness. WPI Interactive Qualifying Project 2019-2020
# Installation
 ## Deploying the back-end:
 - Install `docker` and `docker-compose`
 - Clone the repo:
	  `git clone https://github.com/brycecorbitt/MBSR.git`
 - Edit the [config.json](https://github.com/brycecorbitt/MBSR/blob/master/config.json) to include the domain or ip address the server will listen on:
	 ```json
		"mbsr_connection": {
			"protocol": "http",
			"host": "localhost",
			"port": 34543
		}
	```
- *Optionally*, you may also add the username and password of a gmail account to the [config.json](https://github.com/brycecorbitt/MBSR/blob/master/config.json) to enable account registration, creation, and recovery requests:
	 ```json
	"mailer": {
		"service": "gmail",
		"auth": {
			"user": "mygmail@gmail.com",
			"pass": "mygmailpassword"
		}
	}
	```
- Run the `docker-compose` file:
	```
	cd MBSR
	docker-compose up
	```
	**NOTE:**  If you are unable to connect to the CMS service (strapi) after launching for the first time, try stopping the containers with `docker-compose-down` and starting them up again.

By default, the MBSR server will run on port 34543, and the CMS server will run on port 1337.
If running locally, you may test the connection to the MBSR server by going to http://localhost:34543/ 
![MBSR server landing page](https://i.imgur.com/5bDHVzU.png)

The CMS server can then be accessed at http://localhost:1337/admin with the following credentials:

username:	` mbsrcms`<br>password:	` IQP2020`

This is the default admin account created on the initial startup of the CMS service. If desired, these credentials can be changed in the [.env](https://github.com/brycecorbitt/MBSR/blob/master/.env) file.

![Strapi login screen](https://imgur.com/NSoEQel.png)

![strapi homepage](https://imgur.com/j1wwLbf.png)

## Compiling mobile app for development:
 - Install and configure [React Native](https://facebook.github.io/react-native/docs/getting-started) for Android or iOS development
 - Navigate to app directory and install dependencies with npm or yarn:
	```
	cd MBSR/app
	npm install
	```
- Once an Android emulator/iOS simulator is running, start the React Native development server and connect
	```
	react-native start &
	react-native run-android
	```
	
	**NOTE:**  If the back-end is running on localhost and app is unable to connect through the emulator, you may need to change the mbsr_connection in [config.json](https://github.com/brycecorbitt/MBSR/blob/master/config.json) to your computer's local ip address. This issue occurs when the emulator's network is behind a NAT and localhost for the emulator is different than localhost for the host machine.

When everything is set up, the CMS web portal can be used to add/modify/remove the content that gets streamed to the app:

![Editing content through CMS and showing result on app events screen](https://imgur.com/SEjyPXo.png)

# Platform Design
*This diagram was built using [Visual Paradigm Online](https://online.visual-paradigm.com/). The current VPD file of the design can be downloaded [here](https://drive.google.com/file/d/1yhCIz93xakw1B4B1wPEWKKJQd3cJSAq2/view?usp=sharing).*
![MBSR Deployment Diagram](https://i.imgur.com/8xGQP5i.png)
