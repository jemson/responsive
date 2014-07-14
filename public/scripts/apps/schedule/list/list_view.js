define([
	"app",
	"text!apps/schedule/list/templates/layout.html",
	"text!apps/schedule/list/templates/reservations.html"	
], function(App, LayoutTemplate, ReservationTemplate){

	App.module("ScheduleApp.List", function(List, App, Backbone, Marionette, $, _){

		List.Layout = Marionette.Layout.extend({
			
			template: LayoutTemplate,
			tagName: "main",
			regions: {
				reservationsRegion : "#reservations-region",
				calendarRegion: "#calendar-region",
			},

		});

		List.ReservationsItemView = Marionette.ItemView.extend({
			template: ReservationTemplate,
			templateHelpers: {
				changeBgColor: function(){
					if ( this.isBooked == true ) {
						return "background-color:yellow;"		
					}					
				},
				changeText: function(){
					if ( this.isBooked == true ) {
						return "PAID";						
					} else {
						return this.time;
					}
				},						
			},
			events: {
				"click [data-button]": "showDialog"
			},
			showDialog: function(){
				$("#header-region").addClass("scale margin");
				$("#nav-region").addClass("scale");
				$("#main-region").addClass("scale");
				$("body").addClass("body-color");					
				this.trigger("show:dialog", this);
				// trigger for opening the dialog controller
			},
			modelEvents: {
				"change:isBooked":"render"
			}						
		});
		
		List.ReservationsCollection = Marionette.CollectionView.extend({
			itemView: List.ReservationsItemView,
		});
	
	});

	return App.ScheduleApp.List;

});
