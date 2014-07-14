define([
	"app",
	"text!apps/calendar/show/templates/calendar.html",
	"text!apps/calendar/show/templates/calendar-header.html",
	"text!apps/calendar/show/templates/calendar-body.html",
], function(App, CalendarTemplate, HeaderTemplate, BodyTemplate){

	App.module("CalendarApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Layout = Marionette.Layout.extend({
			template: CalendarTemplate,
			regions: {
				calendarHead: "#calendar-head",
				calendarBody: "#calendar-body"
			}
		});

		Show.Calendar = Marionette.ItemView.extend({
			template: HeaderTemplate,
			events:{
				"click [data-left]": "left",
				"click [data-right]": "right"
			},
			modelEvents: {
				"change": "render"
			},
			left:function(){
				this.trigger("calendar:month:change", -1, this.model);
			},
		 	right:function(){
				this.trigger("calendar:month:change", 1, this.model);
			}
		});

		Show.Date = Marionette.ItemView.extend({
			tagName: "li data-li",
			className: "date-li",
			template: BodyTemplate,
			events: {
				"mouseover" : "fadeIn",
				"mouseout" : "fadeOut"
			},
			triggers: {
				"click": "day:click"
			},
			modelEvents: {
				"change": "render",
			},
			templateHelpers: {
				onSelected: function(){
					console.log(this);
					if (this.isSelected === true ) {
						return "color:white; border-radius:50%; -webkit-transition:all 0.5s; background: -webkit-radial-gradient(gray 9%,black 90%); background: -moz-radial-gradient(gray 9%,black 90%); background: -o-radial-gradient(gray 9%,black 90%); "
					}
				},
			},
			fadeIn:function(){
				this.$el.addClass("visible scale");
			},
			fadeOut:function(){
				this.$el.removeClass("visible scale");
			},
		});

		Show.Dates = Marionette.CollectionView.extend({
			itemView: Show.Date,
			className: "calendar-dates",
			tagName: "ul"
		});
	});

	return App.CalendarApp.Show; 
})