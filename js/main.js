//GLOBAL VARIABLES
var aFileListInput = [];
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
    $("#debug").text("You must select two dates to validate.");
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
      $("#debug").text(aFileListInput.length + " data sets loaded!");
      // displayCharts(); Enable charts after data has been loaded. Function not defined yet.
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


// UI FUNCTIONALITY
///////////////////////////////////////////////////////////////////////////////

// RE-INDEX CONFIRMATION
function openNormalDialog() {
    $("#confirmationDialog").html("Are you sure you want to re-index?" + "<br>" + "Make sure you have the correct files in the savedata folder before proceeding otherwise you might lose data!");

    // Define the Dialog and its properties.
    $("#confirmationDialog").dialog({
        resizable: false,
        modal: true,
        title: "WARNING!",
        height: 275,
        width: 450,
        buttons: {
            "Yes": function () {
                $(this).dialog('close');
                callback(true);
            },
                "No": function () {
                $(this).dialog('close');
                callback(false);
            }
        }
    });
}


$( document ).ready(function() {
  $('#reIndex').click(openNormalDialog);
});


function callback(value) {
    if (value) {
        window.location.href='http://gaserver/cgi-bin/updatefiles.cgi';
    } else {
        return;
    }
}

// TOGGLE ON/OFF CHARTS SECTIONS
$(function(){
    $("#gameCompletionTitle").click(function(){
        $("#chartWaveCompletion").slideToggle("fast");
        $("#chartWaveCompletionAvg").slideToggle("fast");
        $("#chartWaveTime").slideToggle("fast");
        $("#chartWavePyramid").slideToggle("fast");
        $("#gameTimeStatistics").slideToggle("fast");
    });
    $("#combatStatisticsTitle").click(function(){
        $("#chartAttackTypes").slideToggle("fast");
        $("#chartWalkingStrafing").slideToggle("fast");
        $("#chartAttackTypesPerWave").slideToggle("fast");
    });
    $("#healthProgressionTitle").click(function(){
    });
    $("#collectiblesTitle").click(function(){
        $("#chartSoulsCollection").slideToggle("fast");
        $("#chartShardsCollection").slideToggle("fast");
    });
    $("#shopTitle").click(function(){
        $("#chartShopPotions").slideToggle("fast");
        $("#chartShopUpgrades").slideToggle("fast");
        $("#chartShopGlyphs").slideToggle("fast");
        $("#shopStatistics").slideToggle("fast");
    });
    $("#mapTitle").click(function(){
        $("#chartMapHeatMap").slideToggle("fast");
    });
});