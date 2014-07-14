define([
	"app",
	"text!apps/dashboard/_schedule/templates/reservation.html",
	"text!apps/dashboard/_schedule/templates/reservations.html"
], function(App, ReservationTemplate, ReservationsTemplate){

	App.module("DashboardApp.Schedule", function(Schedule, App, Backbone, Marionette, $, _){
	
		Schedule.Reservation = Marionette.ItemView.extend({
			template: ReservationTemplate,
		});

		Schedule.Reservations = Marionette.CompositeView.extend({
			template: ReservationsTemplate,
			itemView: Schedule.Reservation,
			className: "schedule-module",
			itemViewContainer: "#reservations-list",
		});

	});

	return App.DashboardApp.Schedule;
});