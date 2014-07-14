define([
	"app",
	"apps/calendar/show/show_view", 
	"entities/date"
], function(App, View){

	App.module("CalendarApp.Show", function(Show, App, Backbone, Marionette, $, _){
			Show.Controller = Marionette.Controller.extend({
		
					initialize: function(options){
						this.layout = this.getLayoutView();

						this.mo = App.request("dates:entities:months");

						this.dates = App.request("dates:entities:date");

						this.day = App.request("dates:entities:day");

						this.emptyMonth = App.request("dates:entities:emptyMonth");

						this.emptyDate = App.request("dates:entities:emptyDates");

						this.date = new Date();
						this.getMonths();
						this.getDates();

						this.listenTo(this.layout, "show", function(){
							this.calendarHead();
							this.calendarBody();
						});

						options.region.show(this.layout);

						// Allows me to scope "this" on the vent listener
						// to the controller
						_.bindAll(this, 'dateChangeHandler');

						// App event from the day switcher
						App.vent.on("day:change:by", this.dateChangeHandler);

					},

					getLayoutView: function(){
						return new View.Layout();
					},

					getMonthsView:function(){
						return new View.Calendar({model:this.emptyMonth});
					},

					getDatesView:function(){
						return new View.Dates({collection:this.emptyDate});
					},

					calendarHead: function(){
						var headerView = this.getMonthsView();
						this.layout.calendarHead.show(headerView);

						this.listenTo(headerView, "calendar:month:change", this.triggerMonth);
					},

					//trigger the changes on number of days and month
					triggerMonth: function(integer, model){
						this.changeMonth(integer, model);
						this.getDates();
						this.addLi(integer);
					},

					calendarBody: function(){
						this.bodyView = this.getDatesView();
						this.layout.calendarBody.show(this.bodyView);

						this.listenTo(this.bodyView, "childview:day:click", this.changeSelectedDate);
						this.listenTo(this.bodyView, "childview:day:click", this.selectedDate);
					},

					getMonths: function(){
						var that = this;
						var months = this.date.getMonth();
						var year = this.date.getFullYear();
						var day = this.date.getDay();
						var days = this.day.at(day).get("day");
						var exact = this.date.getDate();
						var pick = this.mo.at(months).get("month");

						month = [];

						this.mo.each(function(model){
							if (model.get("month") == pick) {

								// If now month = selected month, then add model value of isNowMonth: true

								// Tried to get automatic default of true of current month
								that.emptyMonth.set({
									month: model.get("month"),
									year: year,
									day: day,
									date: exact,
									number: months,
									isSelected: true,
									originalMonth: months,
								});
								
							}

						});
					},

					// Handler for day changes from other locations
					dateChangeHandler: function(date){
						this.removeCurrentSelected();
						var day = this.getDayFromDate(date);
						var month = date.getMonth();
						this.setNewSelected(day);
						this.changeMonthfromDate(month, date);

					},

					// Removes {isSelected:true} from a model in the current collection
					removeCurrentSelected: function(){
						var oldDate = this.getOldSelectedDate();
						if ( oldDate ) oldDate.set({isSelected: false});
					},

					//{selected day from false -> true
					getOldSelectedDate: function(){
						return this.emptyDate.findWhere({isSelected: true});
					},

					getDayFromDate: function(date){
						return this.emptyDate.findWhere( {date:date.getDate()} );
					},

					setNewSelected: function(day){
						if ( day ) day.set({isSelected: true})
					},
					//}
					
					//change on active day
					changeSelectedDate: function(iv){
						
						var oldDate = this.emptyDate.findWhere({isSelected: true});

						if ( oldDate ) {
							oldDate.set({isSelected: false});
						}
						iv.model.set({isSelected: true});
					},

					//date selector					
					selectedDate: function(iv){
						this.triggerPickdate(iv);
					},

					//attributes by the calendar
					triggerPickdate:function(iv){

						var exactdate = iv.model.get("date");
						var year = this.emptyMonth.get('year');
						var months = this.emptyMonth.get('number');

						// Day Switcher Event trigger
						App.vent.trigger("date:change", new Date(year,months,exactdate));

					},

					changeMonthfromDate:function(month, date){
						var changeMonth = this.mo.at(month).get("month");
						
						this.emptyMonth.set({
							month: changeMonth, 
							number: month
						});
						this.addLi();
					},

					changeMonth: function(integer, model){

						var that = this;
						var months = this.date.getMonth();
						var newMonth = months + integer;
						var year = this.date.getFullYear();

						console.log(months, newMonth);

						if ( newMonth == 12 ) {
							newMonth = 0;
						} else if ( newMonth == -1) {
							newMonth = 11;
						}

						var pick = this.mo.at(newMonth).get("month");

						this.mo.each(function(model){
							if (model.get("month") == pick) {
								that.emptyMonth.set({
									month: model.get("month"),
									year: year,
									number: newMonth
								});
							}
						});

						if (model.get('month') == 'Dec' || model.get('month') == 'Jan') {
							var number = model.get('number') + integer;
							// console.log(number);
							var month = this.date.setMonth(number);
							// console.log(month);
						}
						this.date.setMonth(newMonth);
					},

					//add li in front to match the exact date
					addLi: function(){

						var year = this.emptyMonth.get('year');
						var months = this.emptyMonth.get('number');
						var date = new Date(year,months,1);
						var day = date.getDay();

						var liString = "";

						for ( var i = 0; i < day; i++ ) {
							liString += "<li></li>"
						}

						// remove li's from dom that match this criteria
						$(".calendar-dates li:not(.date-li)").remove();
						// add li to indent the day
						$(".calendar-dates").prepend(liString);
					},

					//getting the exact number of days in a month
					getDates: function(){	
						var that = this;		
						var months = this.emptyMonth.get("number");
						var pick = this.dates.at(months).get("date");
						month = [];

						if ( this.emptyMonth.get("originalMonth") == this.emptyMonth.get("number") ) {
							for (var i = 1; i < Number(pick)+1; i++) {
								if ( this.date.getDate() == i) {
									var list = {
										date: i,
										isSelected: true,
									}
								} else {
									var list = {
										date: i
									}
								}
								month.push(list);
							}							
						} else {
							for (var i = 1; i < Number(pick)+1; i++) {
								var list = {
									date: i
								}
								month.push(list);
							}		
						}

						this.emptyDate.reset();
						this.emptyDate.add(month);
					},
				});
			});
	return App.CalendarApp.Show;
});