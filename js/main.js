//SELECT TIMEFRAME AND LOAD UP THE DATA
///////////////////////////////////////////////////////////////////////////////
$(function() {
	$( "#datePickStart" ).datepicker({
		minDate: new Date(2014, 9 - 1),
		maxDate: new Date(2015, 4 - 1),
		dateFormat: 'yy-mm-dd'});
});

$(function() {
	$( "#datePickEnd" ).datepicker({
		minDate: new Date(2014, 9 - 1),
		maxDate: new Date(2015, 4 - 1),
		dateFormat: 'yy-mm-dd'});
});

function loadDateValues () {
	oStartDate = $( "#datePickStart" ).datepicker( "getDate" );
	oEndDate = $( "#datePickEnd" ).datepicker( "getDate" );
}

$(function(){
  $("#dataValidation").click(function(){
   loadDateValues();

   if (oStartDate === null || oEndDate === null) {
   	$("#debug").text("You must select both dates if you want to load the files.");
   	return;
   } else {
   	//Go through the dates between the START and END create an array with all dates
   	var oCurrentDate = new Date(oStartDate);
    var aDatesList = [];	

    while (oCurrentDate <= oEndDate) {
        aDatesList.push(new Date(oCurrentDate));
        oCurrentDate.setDate(oCurrentDate.getDate() + 1);
    }
    for (i = 0; i < aDatesList.length; i++) {
    	aDatesList[i] = $.datepicker.formatDate ("yy-mm-dd", aDatesList[i]);
    }
   	
var aFileListInput = []; //used for compared list of files,

    //Load all data files from the server into an array. Filelist is generated server-side.
    $.get("data/filelist.txt", function(data) {
      var aPlaytestFiles = []; //used to import all files on server
      

      aPlaytestFiles = data.split('\n');

      for (var i = 0; i < aPlaytestFiles.length; i ++) {
        var sCompareDateFile = aPlaytestFiles[i].slice(0,10);
        for (var j = 0; j < aDatesList.length; j++) {
          var sCompareDateInput = aDatesList[j].slice(0,10);
          if (sCompareDateFile === sCompareDateInput) {
            aFileListInput.push (aPlaytestFiles[i]);
        }
      }
    }
      console.log(aFileListInput);
    });
    
    // $("#debug").text("Start:" + aDatesList[0] + " | "+ "End:" + aDatesList[aDatesList.length-1]);
   	// $("#dataOutput").text(aDatesList.toString());
   }
  });
});