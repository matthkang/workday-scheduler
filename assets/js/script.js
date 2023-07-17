// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(document).ready(function() {
    $("button").click(function(event) {
      var parent_div = $(this).parent();
      var time_value = parent_div.children()[0].textContent;
      var text_area_value = parent_div.children()[1].value;

      // create object of time and desc
      const eventObj = {
        time: time_value,
        desc: text_area_value,
      };

      var timesStorage = localStorage.getItem("event");

      // store event object in localStorage
      if (timesStorage !== null){
        var timesArr = JSON.parse(timesStorage);
      }
      else {
        var timesArr = [];
      }

      let exists = false;

      for (var i = 0; i < timesArr.length; i++){
        var timeEntry = timesArr[i];
        // if desc already exists for time entry
        if (Object.values(timeEntry).indexOf(time_value) > -1) {
            // console.log('time exists: ', time_value);
            // console.log("description was: ", timeEntry.desc);

            timeEntry.desc = text_area_value;
            
            // console.log("description is now: ", timeEntry.desc);
            exists = true;
        }
      }
      
      // first time saving entry, push new object to array
      if (exists === false) {
          timesArr.push(eventObj);
      }

      localStorage.setItem("event", JSON.stringify(timesArr));
    });
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var scheduleBlock = $('.container-fluid');
  var times = scheduleBlock.children();

  var currentHour = dayjs().hour();

  for (var i = 0; i < times.length; i++){
    var entry = times[i];
    var hourId = entry.id; // "hour-9"
    var entryJs = $('#' + hourId)

    var hour = hourId.split('-')[1];

    // in the past
    if (hour < currentHour){
      entryJs.removeClass().addClass("row time-block past");
    }
    // in the present
    else if (hour == currentHour){
      entryJs.removeClass().addClass("row time-block present");
    }
    // in the future
    else {
      entryJs.removeClass().addClass("row time-block future");
    }
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  var storage = localStorage.getItem("event");
  var storageArr = JSON.parse(storage);
  console.log("storage: ", storageArr);
  if (storageArr !== null){
    for (var i = 0; i < storageArr.length; i++){
      var entry = storageArr[i];
      var time = entry.time;
      var hour = time.substring(0, time.length-2);
  
      var desc = entry.desc;
  
      // target block with corresponding hour id 
      var timeEl = $('#hour-' + hour);
  
      // set desc for entry from localStorage
      timeEl.children()[1].value = desc;
    }
  }
  
  //
  // TODO: Add code to display the current date in the header of the page.
  var today = dayjs().format('dddd, MMMM D')
  $('#currentDay').text(today);

});
