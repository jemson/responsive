define([
	"app",	
], function(App){

		App.module("ScheduleApp", function(ScheduleApp, App, Backbone, Marionette, $, _){

		ScheduleApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"schedule": "list"
			}
		});
		
		var API = {
			list: function(){
				require(["apps/schedule/list/list_controller"], function(){
					new ScheduleApp.List.Controller();
				});

				App.trigger("nav:active:change", "#schedule");
			},

			show: function(options){
				require(["apps/schedule/show/show_controller"], function(){
					new ScheduleApp.Show.Controller(options);
				});
			}
		};

		App.vent.on("itemview:show:dialog", function(options){
			API.show(options);		
		});

		App.addInitializer(function(){
			new ScheduleApp.Router({
				controller: API
			});
		});

	});

	return App.Schedule;
});
