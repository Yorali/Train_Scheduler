$(document).ready(function() {
	// Initialize Firebase here



	firebase.initializeApp(config);

	var flame = firebase.database();

	var trainName = '';
	var destination = '';
	var firstRun = 0;
	var frequency = 0;
	var minutesAway = '';

	$('#add-train').on('click', function(addition) {
		addition.preventDefault();

		trainName = $('#name-input').val().trim();
		destination = $('#destination-input').val().trim();
		firstRun = $('#first-train-input').val().trim();
		frequency = $('#frequency-input').val().trim();
		then = moment(firstRun, 'HH:mm').subtract(1, 'years'); //working
		diff = moment().diff(moment(then), 'minutes');
		remainder = diff % frequency;
		minRemain = frequency - remainder;
		next = moment().add(minRemain, 'minutes');
		nextArrival = moment(next).format('HH:mm');
		console.log(nextArrival); // working


		flame.ref().push({
			trainName: trainName,
			destination: destination,
			firstRun: firstRun,
			frequency: frequency,
			nextArrival: nextArrival,
			minutesAway: minRemain,

		});

	});

	flame.ref().on('child_added', function(childSnapshot) {
		console.log(childSnapshot.val().trainName);
		console.log(childSnapshot.val().destination);
		console.log(childSnapshot.val().firstRun);
		console.log(childSnapshot.val().frequency);
		console.log(childSnapshot.val().nextArrival);
		console.log(childSnapshot.val().minutesAway);

		$("#schedule-table").append("<tr class='items'><th class='bits'>" + 
			childSnapshot.val().trainName + "</th><th class='bits'>" + 
			childSnapshot.val().destination + "</th><th class='bits'>" + 
			childSnapshot.val().frequency + "</th><th class='bits'>" + 
			childSnapshot.val().nextArrival + "</th><th class='bits'>" + 
			childSnapshot.val().minutesAway + "</tr>");



	}, function(errorCheck) {
		console.log("Errors dealt with: " + errorCheck.code);
	});

})


