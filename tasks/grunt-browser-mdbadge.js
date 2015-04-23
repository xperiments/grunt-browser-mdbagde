'use strict';
module.exports = function (grunt) {
	grunt.registerMultiTask('browser-badge', 'Log stuff.', function () {

		grunt.log.writeln('Generating Mardown Browser Badge for file: ', this.filesSrc[0]);

		var browsersObj = this.data.browsers;
		var jsonObj = typeof browsersObj === "string" ? grunt.file.readJSON(browsersObj) : browsersObj;
		var browsers = Object.keys(jsonObj);
		var hasIcons = this.data.icons && ( this.data.icons.length == browsers.length );
		var th;

		if (!hasIcons) {
			th = browsers.join('|');
		}
		else {
			var browserIcons = [];
			var self = this;
			browsers.forEach(function (browser, i) {
				var icons = self.data.icons[i].split(' ');
				var iconFiles = [];
				icons.forEach(function (icon) {
					iconFiles.push(['![', browser, '](https://rawgit.com/xperiments/grunt-browser-mdbagde/master/resources/', icon, '.svg)'].join(''));
				});
				browserIcons.push(iconFiles.join(' '));
			});
			th = browserIcons.join('|');
		}
		var thr = browsers.map(function () {
			return "---";
		}).join('|');

		var valuesMap = {};
		browsers.forEach(function (browser) {
			valuesMap[browser] = Object.keys(jsonObj[browser]).map(function (browserVersion) {
				return ['<sub>', jsonObj[browser][browserVersion] ? '✅' : '⛔', browserVersion, '</sub>'].join(' ');
			});
		});

		var maxRows = 0;
		var browserLength;
		browsers.forEach(function (browser) {
			browserLength = valuesMap[browser].length;
			maxRows = maxRows < browserLength ? browserLength : maxRows;
		});
		var output = [th, thr];
		var lines = [];
		var slines = [];
		for (var i = 0; i < maxRows; i++) {
			lines[i] = [];
			browsers.forEach(function (browser, x) {
				lines[i][x] = valuesMap[browser][i] || " ";
			});
			slines[i] = lines[i].join('|');
		}

		var table = output.concat(slines).join('\n');
		var f = grunt.file.read(this.filesSrc);
		var hasBrowserBadge = f.indexOf('<!--browser-badge-->') != -1;
		var hasCloseBadge = f.indexOf('<!--!browser-badge-->') != -1;

		if (hasBrowserBadge && !hasCloseBadge) {
			f = f.replace('<!--browser-badge-->', '<!--browser-badge-->\n' + table + '\n<!--!browser-badge-->\n');
		}

		if (hasBrowserBadge && hasCloseBadge) {
			f = f.replace(/(<!--browser-badge-->)([\s\S]*)(<!--!browser-badge-->)/g, '$1\n' + table + '\n$3');
		}

		grunt.file.write(this.data.dest || this.filesSrc[0], f);

	});
};
