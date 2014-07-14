define([
	"app",
	"text!apps/dashboard/show/templates/layout.html"
], function(App, LayoutTemplate){

	App.module("DashboardApp.Show", function(Show, App, Backbone, Marionette, $, _){
	
		Show.Layout = Marionette.Layout.extend({
			template: LayoutTemplate,
			tagName: "main",
			regions: {
				dayRegion: "#day-region",
				reservationCountRegion: "#reservation-count-region",
				reservationNextRegion: "#reserve-next-region",
				smallScheduleRegion: "#small-schedule-region",
				calendarRegion: "#calendar-region",
			},
		});


	});

	return App.DashboardApp.Show;
});