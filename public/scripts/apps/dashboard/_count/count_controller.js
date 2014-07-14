define([
	"app",
	"apps/dashboard/_count/count_view"
], function(App, View){

	App.module("DashboardApp.Count", function(Count, App, Backbone, Marionette, $, _){
	
		Count.Controller = Marionette.Controller.extend({
			initialize: function(options){
				this.collection = options.collection;
		
				var countsView = this.getCountsView();

				options.region.show(countsView);
			},
		
			getCountsView: function(){
				return new View.Counts({collection:this.collection});
			},
		
			
		});

	});

	return App.DashboardApp.Count;
});