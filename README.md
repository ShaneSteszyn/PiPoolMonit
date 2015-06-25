PiPoolMonit
==========
Monitor your pool's temperature using a RPI!

## Installation
```
git clone git@github.com:ShaneSteszyn/PiPoolMonit.git
cd poolmonit
npm install
bower install
node config
```

### Server

Use forever or pm2 to keep server going.

    npm install -g pm2
    pm2 start server

or for some dev action:

    node server.js --development

## Screenshots!
![Screenshot](/images/screenshot.jpg?raw=true "Screenshot")

## Built with
- [ExpressJS](http://expressjs.com/) server engine
- [Bower](http://bower.io/) front-end package manager
- [NPM](https://www.npmjs.com/) back-end package manager
- [NodeJS](http://nodejs.org/) JavaScript engine
- [PM2](https://github.com/Unitech/pm2) process manager and load balancer
- [Jquery](http://jquery.com/) Jqeury
- [AngularJS](https://angularjs.org/) Angular
- [AngularMaterial](https://material.angularjs.org/) Material design + Angular
- [ChartJS](http://www.chartjs.org/) Graphing!
- [python-shell](https://github.com/extrabacon/python-shell) Run Python scripts within node
- [RPi-GPIO](https://github.com/JamesBarwell/rpi-gpio.js) Control Pi GPIO pins from node


# Built by
- [@shanesteszyn](https://github.com/shanesteszyn)
