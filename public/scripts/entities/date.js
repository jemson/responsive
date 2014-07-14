define(["app"], function(App){

	App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

		// Todo - Merge Day Model w/ Date
		Entities.Day = Backbone.Model.extend({
			initialize: function(options){
				var date = options.date || new Date();

				this.setDate(date);
			},

			shortDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			longDayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			longMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

			defaults: {
				isSelected: false,
			},
			setDate: function(date){
				this.set({
					dayName: this.getDayName(date.getDay()),
					day: date.getDate(),
					month:  this.getMonthName(date.getMonth()),
					year: date.getFullYear(),
					date: date
				});
			},

			changeDay: function(value){
				var date = this.get("date");
				date.setDate(date.getDate()+value);

				this.setDate(date);				
			},

			getDayName: function(dayNumber){
				return this.longDayNames[dayNumber];
			},

			getMonthName: function(monthNumber){
				return this.longMonthNames[monthNumber];
			},
		});

		Entities.Date = Backbone.Model.extend({
			defaults: {
				isSelected: false,
			},
		});

		Entities.DateCollection = Backbone.Collection.extend({
			model: Entities.Date
		});

		var API = {
			getDate: function(options){
				var day = new Entities.Day(options);

				return day;
			},

			getMonths: function(){
				var months = new Entities.DateCollection([
					{ month: "Jan" },
					{ month: "Feb" },
					{ month: "Mar" },
					{ month: "Apr" },
					{ month: "May" },
					{ month: "Jun" },
					{ month: "Jul" },
					{ month: "Aug" },
					{ month: "Sep" },
					{ month: "Oct" },
					{ month: "Nov" },
					{ month: "Dec" },
					// "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"  

				]);

				return months;
			},

			getDays:function(){
				var day = new Entities.DateCollection([
					{ day: "Sun" },
					{ day: "Mon" },
					{ day: "Tue" },
					{ day: "Wed" },
					{ day: "Thu" },
					{ day: "Fri" },
					{ day: "Sat" },
				]);

				return day;
			},

			getDates: function(){
				var date = new Entities.DateCollection([
					{ date: 31 },
					{ date: 28 },
					{ date: 31 },
					{ date: 30 },
					{ date: 31 },
					{ date: 30 },
					{ date: 31 },
					{ date: 31 },
					{ date: 30 },
					{ date: 31 },
					{ date: 30 },
					{ date: 31 },
				]);

				return date;
			},

			newEmptyDate: function(){
				var emptyDate = new Entities.Date();

				return emptyDate;
			},

			newEmptyDates: function(){
				var emptyDates = new Entities.DateCollection();

				return emptyDates;
			},

		};

		/*
		Handler should follow the form:
		date:entity:name:of:request if we're requesting a model
								-or-
		date:entities:name:of:request if we're requesting a collection
		*/

		App.reqres.setHandler("dates:entities:months", function(){
			return API.getMonths();
		});

		App.reqres.setHandler("dates:entities:day", function(){
			return API.getDays();
		});

		App.reqres.setHandler("dates:entities:date", function(){
			return API.getDates();
		});

		App.reqres.setHandler("dates:entities:emptyMonth", function(){
			return API.newEmptyDate();
		});

		App.reqres.setHandler("dates:entities:emptyDates", function(){
			return API.newEmptyDates();
		});

		App.reqres.setHandler("date:entity", function(options){
			return API.getDate(options);
		});

	});

	return;
});