require.config({
	// urlArgs: "bust=" + (new Date()).getTime(), // for development
	paths: {
		backbone: "libs/backbone/backbone",
		marionette: "libs/backbone/backbone.marionette",
		jquery: "libs/jquery/jquery-2.1.1",
		underscore: "libs/lodash/lodash",
		text: "libs/require/text",
		moment: "libs/utils/moment",
	},
	shim: {
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		marionette: {
			deps: ["backbone"],
			exports: "Marionette"
		}
	}
});

require(["app"], function(App){
	App.start();
});