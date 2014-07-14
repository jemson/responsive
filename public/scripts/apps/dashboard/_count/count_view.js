define([
	"app",
	"text!apps/dashboard/_count/templates/counts.html"
], function(App, CountsTemplate){

	App.module("DashboardApp.Count", function(Count, App, Backbone, Marionette, $, _){
	
		Count.Counts = Marionette.ItemView.extend({
			template: CountsTemplate,
			className: "count-module",
			serializeData: function(){
				return {
					reservationCount: this.collection.countReservations(),
					availableCount: this.collection.countAvailableReservations(),
				}
			}

		});

	});

	return App.DashboardApp.Count;
});