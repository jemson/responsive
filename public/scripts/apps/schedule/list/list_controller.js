define([
	"app",
	"apps/schedule/list/list_view",
	"entities/reservation"	
], function(App, View){

	App.module("ScheduleApp.List", function(List, App, Backbone, Marionette, $, _){

		List.Controller = Marionette.Controller.extend({

			initialize: function(){
				
				this.reservationCollection = App.request("reservations:entities:empty");

				// this.emptyCollection = App.request("reservations:entities:empty");

				this.layoutView = this.getLayoutView();

				this.listenTo(this.layoutView, "show", function(){
					this.calendarRegion();
					this.reservationsRegion();

				});

				App.mainRegion.show(this.layoutView);
				this.listenTo(this.listView, "itemview:show:dialog", this.showDialog);
				// listener for the trigger in the dialog view
			},

			reservationsRegion: function(){
				this.listView = this.getReservationsView();
				this.layoutView.reservationsRegion.show(this.listView);
			},

			getLayoutView: function(){
				return new View.Layout();
			},

			getReservationsView: function(){
				return new View.ReservationsCollection({collection: this.reservationCollection});

			},

			calendarRegion: function(){
				App.execute("calendar:load", { region: this.layoutView.calendarRegion } );
			},

			showDialog: function(iv){
				App.vent.trigger("itemview:show:dialog", {model: iv.model});
			},

		});
	
	});

	return App.ScheduleApp.List;

});
