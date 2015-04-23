# grunt-browser-mdbagde

	Simple grunt task that generates Browser Compatibility Tables form json data.

## Install

	$> npm install grunt-browser-mdbagde --save-dev

## Add it to your MD file

To add the badge code to your MD, insert the next comment into your MD source:

	<!--browser-badge-->

## Configure and run task

    grunt.loadNpmTasks('grunt-browser-mdbadge');

	grunt.initConfig({
		browser-badge":{
			basic:{
				src:'./README.md', // <-- No dest specified, src will be overwrite
				browsers:'./browsers.json'
			},
			customDestination: {
				src:'./README.md',
				dest:'./README_badge.md', // <-- Specify a destination file
				browsers:'./browsers.json'
			},
			inlineData: {
				src:'./README.md',  // <-- No dest specified, src will be overwrite
				browsers:{
					"explorer" : { "12.0" : false, "8.0" : false, "9.0" : false },
					"firefox" : { "10.0" : true, "11.0" : true, "12.0" : false, "13.0" : true, "nightly" : true },
					"chrome" : { "14.0" : true, "15.0" : true, "16.0" : true, "canary" : true },
					"safari" : { "5.0.5" : false, "5.1.0" : false, "5.1.1" : true },
					"opera" : { "10.6" : false, "11.0" : false, "11.6" : false },
					"iphone": { "6.0" : true },
					"ipad": { "6.0" : true },
					"android-chrome": { "20.0" : true },
					"android-browser": { "4.2" : true }
				}
			}
		}
	});