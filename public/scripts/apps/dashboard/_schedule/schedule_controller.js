define([
	"app",
	"apps/dashboard/_schedule/schedule_view"
], function(App, View){

	App.module("DashboardApp.Schedule", function(Schedule, App, Backbone, Marionette, $, _){
	
		Schedule.Controller = Marionette.Controller.extend({
			initialize: function(options){
				var d = new Date();
				var time = ('0'+d.getHours()).slice(-2)+('0'+d.getMinutes()).slice(-2);

				var filteredCollection = _.first(options.collection.getReservationsByTime(time), 10);

				this.collection = App.request("reservation:entities:recreate", {data:filteredCollection});
		
				this.reservationsView = this.getReservationsView();
		
				options.region.show(this.reservationsView);
			},
		
			getReservationsView: function(){
				return new View.Reservations({collection:this.collection});
			},
		
			
		});

	});

	return App.DashboardApp.Schedule;
});