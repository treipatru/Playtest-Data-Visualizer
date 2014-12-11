//#############################################################################
//#############################################################################
//
// MAIN JAVASCRIPT FILE
// andrei@planet34.org 2014
//
//#############################################################################
//#############################################################################


//#############################################################################
// UI FUNCTIONALITY
//#############################################################################

// INITIALIZE DATE PICKERS
//-----------------------------------------------------------------------------
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

// RE-INDEX CONFIRMATION MODAL WINDOW
//-----------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------
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
        $("#chartHealthPlot").slideToggle("fast");
        $("#chartHealthAveragePotionsRevives").slideToggle("fast");
    });
    $("#collectiblesTitle").click(function(){
        $("#chartSoulsCollection").slideToggle("fast");
        $("#chartShardsCollection").slideToggle("fast");
        $("#chartAverageSoulsShards").slideToggle("fast");
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


//#############################################################################
// GLOBAL VARIABLES
//#############################################################################
var oStartDate; //date variable for the START datepicker
var oEndDate; //date variable for the END datepicker
var aFileListInput = []; //array with exact names of files to be imported
var aDatesList = []; //array with all the days between start and end dates
var aPlaytestFiles = []; //used to import all files on server
var aCompleteData = []; //array 

//#############################################################################
// DEFINE FUNCTIONS TO BE CALLED WHEN PROGRAM IS INITIALIZED
//#############################################################################


// USE DATES FROM DATEPICKER TO SET VARIABLES VALUES
//-----------------------------------------------------------------------------
function fSetDateVariables() {
    oStartDate = $( "#datePickStart" ).datepicker( "getDate" );
    oEndDate = $( "#datePickEnd" ).datepicker( "getDate" );
}


// USE DATES VARIABLES TO CREATE AN ARRAY WITH ALL VALID DATES FROM SELECTION
//-----------------------------------------------------------------------------
function fSetDateArray () {
    var oCurrentDate = new Date(oStartDate);
    while (oCurrentDate <= oEndDate) {
        aDatesList.push(new Date(oCurrentDate));
        oCurrentDate.setDate(oCurrentDate.getDate() + 1);
    }
    for (i = 0; i < aDatesList.length; i++) {
        aDatesList[i] = $.datepicker.formatDate ("yy-mm-dd", aDatesList[i]);
    }
}

// PARSE FILELIST AND COMPARE DATE SELECTION WITH FILES ON SERVER
// LOAD ALL VALID FILES AS OBJECTS IN aCompleteData ARRAY
//-----------------------------------------------------------------------------
function fParseFilelist () {
    $.get("data/filelist.txt", function(data) {
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
    for (var k = 0; k < aFileListInput.length; k++) {
        var fileName = "data/" + aFileListInput[k];
        var objectName = fileName;
        $.ajax({
            url: fileName,
            async: false,
            dataType: 'json',
            success: function (response) {
                objectName = response;
                aCompleteData.push(objectName);
            }
        });
    }
    //RETURN INFORMATION TO INTERFACE
    if ( aCompleteData[0] === undefined) {
        fOutputLog ("nodataloaded");
        return;
    } else {
        fOutputLog ("dataloadsuccessful");
        fCrunchData ();
    }

});
}

// COMPUTE DATA REQUIRED FOR CHARTS
//-----------------------------------------------------------------------------
function fCrunchData () {
    //GAME COMPLETION

}

// DEBUG - CHECK IF DATA IS LOADED AND NOTIFY THE USER
//-----------------------------------------------------------------------------
function fOutputLog (situation) {
    if (situation === "noinput") {
        $("#debug").html("<p style=\"display: inline;color: red;\">" + "You must select two dates to validate." + "</p>");
        return;
    } else if (situation === "nodataloaded") {
        $("#debug").html("<p style=\"display: inline;color: red;\">" + "No data was loaded!" + "</p>");
    } else if (situation === "dataloadsuccessful") {
       $("#debug").html("<p style=\"display: inline;color: blue;\">" + aCompleteData.length + " data sets loaded!" + "</p>"); 
    }
}

//#############################################################################
// RUN THE SHOW WHEN LOAD DATA BUTTON IS CALLED
//#############################################################################


// DEFINE FUNCTIONS TO BE CALLED WHEN PROGRAM IS INITIALIZED
//-----------------------------------------------------------------------------
$(function(){
  $("#dataValidation").click(function(){
    fSetDateVariables();

   if (oStartDate === null || oEndDate === null) {
    fOutputLog ("noinput");
    return;
   } else {
    fSetDateArray ();
    //DRAW THE REST OF THE FUCKING OWL
    fParseFilelist ();
   }
  });
});