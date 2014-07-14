define([
	"app",
	"text!apps/dashboard/_day/templates/switch.html"
], function(App, SwitchTemplate){

	App.module("DashboardApp.Day", function(Day, App, Backbone, Marionette, $, _){
	
		Day.Switch = Marionette.ItemView.extend({
			template: SwitchTemplate,
			className: "day-module",
			events: {
				"click [data-up]": "dayUp",
				"click [data-down]": "dayDown"
			},
			modelEvents: {
				"change": "render"
			},

			dayUp: function(){
				this.trigger("day:change", 1)
			},
			dayDown: function(){
				this.trigger("day:change", -1)
			},
		});

	});

	return App.DashboardApp.Day;
});