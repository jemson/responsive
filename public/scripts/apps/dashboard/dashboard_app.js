define([
	"app"
], function(App){

	App.module("DashboardApp", function(DashboardApp, App, Backbone, Marionette, $, _){
	
		DashboardApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"dashboard": "showDashboard"
			}
		});
		
		var API = {
			showDashboard: function(){
				require(["apps/dashboard/show/show_controller"], function(){
					new DashboardApp.Show.Controller();
				});
				App.trigger("nav:active:change", "#dashboard");
			},
			refreshNext: function(options){
				options.region.reset();
				API.loadNext(options);
			},
			loadNext: function(options){
				require(["apps/dashboard/_next/next_controller"], function(){
					new DashboardApp.Next.Controller(options);
				});
			},
			loadCount: function(options){
				require(["apps/dashboard/_count/count_controller"], function(){
					new DashboardApp.Count.Controller(options);
				});
			},
			loadDay: function(options){
				require(["apps/dashboard/_day/day_controller"], function(){
					new DashboardApp.Day.Controller(options);
				});
			},
			loadSchedule: function(options){
				require(["apps/dashboard/_schedule/schedule_controller"], function(){
					new DashboardApp.Schedule.Controller(options);
				});
			},
		};
		
		App.addInitializer(function(){
			new DashboardApp.Router({
				controller: API
			});
		});

		App.commands.setHandler("next:load:region", function(options){
			API.loadNext(options);
		});

		App.commands.setHandler("next:refresh", function(options){
			API.refreshNext(options);
		});

		App.commands.setHandler("count:load:region", function(options){
			API.loadCount(options);
		});

		App.commands.setHandler("day:load:region", function(options){
			API.loadDay(options);
		});

		App.commands.setHandler("schedule:load:region", function(options){
			API.loadSchedule(options);
		});

	});

	return App.DashboardApp;
});