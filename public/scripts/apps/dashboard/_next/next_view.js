define([
	"app",
	"text!apps/dashboard/_next/templates/next.html"
], function(App, NextTemplate){

	App.module("DashboardApp.Next", function(Next, App, Backbone, Marionette, $, _){
	
		Next.Reserve = Marionette.ItemView.extend({
			template: NextTemplate,
			templateHelpers: {
				timeToNextFlight: function(){
					var d = new Date(),
						dHours = ('0'+d.getHours()).slice(-2),
						dMinutes = ('0'+d.getMinutes()).slice(-2),
						time = dHours+dMinutes;

					if ( this.nextAvailableReservation === "Tomorrow") {
						return "Tomorrow";
					}

					if ( Number(time)+15 > this.nextAvailableReservation ) {
						return "NOW";
					} else {
						return ( this.nextAvailableReservation.slice(0,2) - dHours ) * 60 + ( this.nextAvailableReservation.slice(2) - dMinutes ) + " minutes";
					}
				}
			},
			className: "next-module",
			serializeData: function(){
				return {
					nextAvailableReservation: (typeof this.model === 'undefined') ? "Tomorrow" : this.model.get("time"),
				}
			},
			triggers: {
				"click .btn": "save:next:reservation"
			}
		});

	});

	return App.DashboardApp.Next;
});