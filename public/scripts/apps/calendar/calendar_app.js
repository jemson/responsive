define([
	"app"
], function(App){

	App.module("CalendarApp", function(CalendarApp, App, Backbone, Marionette, $, _){

		var API = {
			loadCalendar: function(options){			
				require(["apps/calendar/show/show_controller"], function(){
					new CalendarApp.Show.Controller(options);
				});
			}
		};

		App.commands.setHandler("calendar:load", function(options){
			API.loadCalendar(options);
		});

	});

	return App.CalendarApp;
});