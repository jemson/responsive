define([
	"app",
	"text!apps/nav/show/templates/layout.html"
], function(App, LayoutTemplate){

	App.module("NavApp.Show", function(Show, App, Backbone, Marionette, $, _){
	
		Show.Layout = Marionette.Layout.extend({
			template: LayoutTemplate,
			tagName: "nav",
		});

	});

	return App.NavApp.Show;
});