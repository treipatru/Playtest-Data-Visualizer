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
   	$("#debug").text("Start:" + aDatesList[0] + " | "+ "End:" + aDatesList[aDatesList.length-1]);
   	$("#dataOutput").text(aDatesList.toString());
   }
  });
});