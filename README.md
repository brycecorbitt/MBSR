# MBSR
A mobile platform to provide resources for Mindfulness Based Stress Reduction (MBSR). WPI Interactive Qualifying Project 2019-2020 and Major Qualifying Project 2020-2021.

**2021 Project Video**: https://youtu.be/5BBDuLO8_Cc
# Installation
 ## Deploying the back-end:
 - Install `docker` and `docker-compose`
 - Clone the repo:
	  `git clone https://github.com/brycecorbitt/MBSR.git`
 - If you are **NOT** deploying with Docker, edit the [config.json](https://github.com/brycecorbitt/MBSR/blob/master/config.json) to include the domain or ip address app will use to connect to the server:
	 ```json
	{
		"mbsr_connection": {
			"protocol": "http",
			"host": "172.16.1.3",
			"port": 34543
		},
		"event_logging": {
			"enabled": true,
			"console": true
		},
		"mailer": {
			"service": "gmail",
			"auth": {
				"user": "[GMAIL_EMAIL]",
				"pass": "[GMAIL_PASSWORD]"
			}
		}
	}
	```
	***NOTE***: *`localhost` should **not** be used as the address in this configuration file, as the mobile app will loop back to the device's `localhost` and be unable to connect to the server. If the mobile device is running on the same network as the server, the server's local ip address may be used.*
	
	If you're using Docker, `172.16.1.3` is the default IP for the MBSR server on the docker container (see [docker-compose.yml](docker-compose.yml))

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
	[Nodemailer](https://nodemailer.com/about/) is being used under the hood to send emails for account registration/recovery. Make sure you configure your gmail account properly to allow nodemailer to send emails! Though not tested, changing the "service" to another Nodemailer compatible SMTP service should work.
- Run the `docker-compose` file:
	```
	cd MBSR
	docker-compose up
	```
	**NOTE:** If you are unable to connect to the CMS service (strapi) after launching for the first time, give it some time. The first startup usually takes longer because Strapi needs to initialize itself, and the logs will show the MBSR server failing to connect to Strapi multiple times while this is happening. If you're unable to connect after 10-15 minutes, try re-creating the containers with `docker-compose-down && docker-compose up`.

By default, the MBSR server will run on port 34543, and the CMS server will run on port 1337.

If running locally on a **linux** based OS, you may test the connection to the MBSR server by going to http://172.16.1.3:34543/

If running locally on **Windows** or **Mac OS**, you will be unable to access docker containers by their bridge IP addresses (see [Docker Limitations](https://docs.docker.com/docker-for-windows/networking/#per-container-ip-addressing-is-not-possible)). However, the [docker-compose.yml](docker-compose.yml) is configured to bind container ports to your host machine. You should be able to access the MBSR server using `http://localhost:34543/` or with your computer's local IP address. This has not been tested on Windows, but has on Mac OS with success.

![MBSR server landing page](https://i.imgur.com/NDDl3xN.png)

The CMS server can then be accessed at http://172.16.1.2:1337/admin with the following credentials:

email:	`bscorbitt@wpi.edu`<br>password:	`mbsrMQP2021`

This is the default admin account created on the initial startup of the CMS service. If desired, these credentials can be changed in the [.env](.env) file. If deploying on **Windows** or **Mac OS**, you'll need to use `localhost` or your computer's local IP instead, just as accessing the MBSR server.

![Strapi login screen](https://i.imgur.com/Z1Kchc6.png)

![strapi homepage](https://i.imgur.com/bzAzadh.png)

### For those using Docker:
The MBSR Server code is only updated after building a new image (in other words, no volume mounting). If re-building the image every time you update the server code gets annoying you can either try updating the [Dockerfile](server/Dockerfile) and [docker-compose.yml](docker-compose.yml) to mount the source code as a volume, or you can simply run the MBSR server outside of docker during development and keep containers running for the DB and CMS (what I do). If you're doing this on **Windows** or **Mac OS**, remember that the MBSR server will no longer be able to access containers by their bridge network IPs, since it will no longer be running from within Docker. I recommend making a separate .env file or run configuration that sets the `CMS_HOST` and `DB_HOST` environment variables to reflect the IP address of your machine (or `localhost`). 

## Compiling mobile app for development:
 - Install and configure [React Native](https://facebook.github.io/react-native/docs/getting-started) for Android or iOS development
 - Navigate to app directory and install dependencies with npm or yarn:
	```
	cd MBSR/app
	yarn install
	```
- Once an Android emulator is running, start the React Native development server and connect. You'll probably want to run these in different terminal windows.
	```
	react-native start
	react-native run-android
	```
	
	**NOTE:** If the back-end is running on localhost and app is unable to connect through the emulator, you may need to change the mbsr_connection in [config.json](https://github.com/brycecorbitt/MBSR/blob/master/config.json) to your computer's local ip address. This issue occurs when the emulator's network is behind a NAT and localhost for the emulator is different from localhost for the host machine. This is already mentioned above, but I put it here again because it's THAT important.

### Events System Logging
The platform's in-house event system can be used to record in-app activities and is enabled by default. The following portion of the [config.json](/config.json) can be used to enable/disable event recording to the MBSR server and React Native log output, respectively:
``` json
	"event_logging": {
		"enabled": true,
		"console": true
	}
```
### Modifying the video player
You'll notice the video player component is a custom fork of [react-native-video-controls](https://github.com/itsnubix/react-native-video-controls). It's a submodule in this repo in the [/app](/app) directory. The fork makes a few small UI changes, makes the buttons easier to press, and adds callbacks for Volume adjustment and Video scrubbing that are used in the events system. If you want to change the video player code, you'll have to make a fork of [this fork](https://github.com/brycecorbitt/mbsr-react-native-video-controls), and update the app's [package.json](/app/package.json) to pull from the fork's repo address. When modifying the fork locally, I usually create a symlink to the `node_modules/react-native-video-controls` directory so the app uses the local fork. 

## Managing MBSR Content
When everything is set up, the CMS web portal can be used to add/modify/remove the content that gets streamed to the app:

![Editing content through CMS and showing result on app events screen](https://i.imgur.com/5eGxmGp.png)

# Platform Design
*This diagram was built using [Visual Paradigm Online](https://online.visual-paradigm.com/). The current VPD file of the design can be downloaded [here](https://drive.google.com/file/d/1yhCIz93xakw1B4B1wPEWKKJQd3cJSAq2/view?usp=sharing).*
![MBSR Deployment Diagram](https://i.imgur.com/8xGQP5i.png)
