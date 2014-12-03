//GLOBAL VARIABLES
var aFileListInput = []; //
var completeData = [];
var completeDataLoaded = false;

//SELECT TIMEFRAME, CREATE LIST OF VALID FILES AND LOAD THEM AS OBJECTS IN 
// completeData ARRAY
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
    importToObject();

    if (completeDataLoaded === true) {
      $("#debug").text("Data loaded!");
      displayCharts();
    }

    });
   }
  });
});


// LOAD ALL VALID FILES TO AN ARRAY OF OBJECTS
function importToObject () {
  for (var i = 0; i < aFileListInput.length; i++) {
    var fileName = "data/" + aFileListInput[i];
    $.getJSON(fileName, function(data) {
      var tempObject = data;
      completeData.push (tempObject);
  });
  }
  completeDataLoaded = true;
}

$(function(){
  $("#dataDisplay").click(function(){
    
  });
});


// EXPERIMENTAL SHIZZLE
// {
//     "ID": "asdfg1234",
//     "Wave Number":["1", "2", "3", "4", "5", "6"],
//     "Souls Collected":["20", "60", "70", "100"],
//     "Health Lost":["21", "0", "50", "70"],
//     "Potions Used":["0", "0", "0", "1"],
//     "Revives":["0", "0", "0", "1"],
//     "Upgrades Bought":["None", "T1 STR", "T1 DEX", "T1 SPD"],
//     "Potions Bought":["0", "1", "0", "0"],
//     "Melee":["29", "50", "100", "150"],
//     "Melee Charge":["0", "0", "0", "24"],
//     "Range":["19", "20", "40", "100"],
//     "Range Charge":["0", "0", "0", "0"],
//     "Strafing Time":["16", "20", "100", "120"],
//     "Time":["28", "40", "150", "170"]
// }

function displayCharts () {
  $(document).ready(function() {
  var chart1title = "Waves Finished";
  var chart1Categories = ['Wave Number'];

    for (i=0; i<chart1Categories.length; i++) {
      chart1Categories[i] = String(chart1Categories[i]);
    }

     var chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart',
            type: 'bar'
        },
        title: {
            text: chart1title
        },
        xAxis: {
            categories: chart1Categories
        },
        yAxis: {
            title: {
                text: 'Attacks Performed'
            }
        },
        series: [{
            name: 'Melee',
            data: [1, 0, 4]
        }, {
            name: 'Ranged',
            data: [2, 7, 5]
        }]
    });
});
}