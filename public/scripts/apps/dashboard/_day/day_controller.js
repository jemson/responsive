define([
	"app",
	"apps/dashboard/_day/day_view"
], function(App, View){

	App.module("DashboardApp.Day", function(Day, App, Backbone, Marionette, $, _){
	
		Day.Controller = Marionette.Controller.extend({
			initialize: function(options){
				this.model = options.model;

				var dayView = this.getDayView();		
				options.region.show(dayView);

				// Allows me to scope "this" on the vent listener
				// to the controller
				_.bindAll(this, 'setDate');

				App.vent.on("date:change", this.setDate);
				this.listenTo(dayView, "day:change", this.changeDay)

			},

			setDate: function(date){
				this.model.setDate(date);
			},

			changeDay: function(value){
				this.model.changeDay(value);
				App.vent.trigger("day:change:by", this.model.get("date"))
			},
		
			getDayView: function(){
				return new View.Switch({model: this.model});
			},
		
		});

	});

	return App.DashboardApp.Day;
});