define([
	"app",
	"apps/dashboard/show/show_view",
	"entities/date",
	"entities/reservation"
], function(App, View){

	App.module("DashboardApp.Show", function(Show, App, Backbone, Marionette, $, _){
	
		Show.Controller = Marionette.Controller.extend({
			initialize: function(options){
				var data = {
					date: new Date(),
				}

				this.day = App.request("date:entity", data);
				this.reservations = App.request("reservation:entities", {date:this.day.get("date")})
		
				this.layout = this.getLayout();
		
				this.listenTo(this.layout, "show", function(){
					this.dayRegion();
					this.reservationCountRegion();
					this.reservationNextRegion();
					this.smallScheduleRegion();
					this.calendarRegion();
				});
		
				App.mainRegion.show(this.layout);

				_.bindAll(this, 'getNewReservations', 'getNewReservations');
				// App.vent.on("date:change", this.getNewReservations);
				App.vent.on("day:change:by", this.getNewReservations);
			},
		
			getLayout: function(){
				return new View.Layout();
			},

			dayRegion: function(){
				App.execute("day:load:region", { region: this.layout.dayRegion, model: this.day, collection: this.reservations });
			},
			reservationCountRegion: function(){
				App.execute("count:load:region", { region: this.layout.reservationCountRegion, collection: this.reservations} );
			},
			reservationNextRegion: function(){
				App.execute("next:load:region", { region: this.layout.reservationNextRegion, model: this.day, collection: this.reservations} );
			},
			smallScheduleRegion: function(){
				App.execute("schedule:load:region", { region: this.layout.smallScheduleRegion, collection: this.reservations} );
			},
			calendarRegion: function(){
				App.execute("calendar:load", { region: this.layout.calendarRegion } );
			},

			getNewReservations: function(data){
				this.reservations = App.request("reservation:entities", {date:data});
				this.layout.reservationCountRegion.reset();
				this.reservationCountRegion();
			},
		
			
		});

	});

	return App.DashboardApp.Show;
});