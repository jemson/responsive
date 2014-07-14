define([
	"app",
	"apps/dashboard/_next/next_view",
	"entities/reservation"
], function(App, View){

	App.module("DashboardApp.Next", function(Next, App, Backbone, Marionette, $, _){
	
		Next.Controller = Marionette.Controller.extend({
			initialize: function(options){
				this.day = options.model;
				this.collection = options.collection;
				this.nextReservation = this.collection.getNextReservation(this.getCurrentTime());
				this.region = options.region;

				this.nextModule = this.getNextSubModule();
				options.region.show(this.nextModule);

				this.listenTo(this.nextModule, "save:next:reservation", this.saveReservation);
			},
		
			getNextSubModule: function(){
				return new View.Reserve({
					model: this.nextReservation,
					collection:this.collection
				});
			},

			getCurrentTime: function(){
				var d = new Date(),
					time = ('0'+d.getHours()).slice(-2)+('0'+d.getMinutes()).slice(-2);

				return time;
			},

			saveReservation: function(iv){
				iv.model.set({isBooked:true})

				App.execute("next:refresh", {region:this.region, collection: this.collection});
			},
		
			
		});

	});

	return App.DashboardApp.Next;
});