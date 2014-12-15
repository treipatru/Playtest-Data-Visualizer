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
    $("#debug").click(function(){
        $("#fileList").slideToggle("fast");
    });
    
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
var aCompleteData = []; //array containing all imported objects


// GRAPH ACCESSIBLE DATA
//-----------------------------------------------------------------------------


//GAME COMPLETION
var aDataIds = []; //all loaded games
var aDataWaveCompletion = []; //waves completed per games in aDataIds
var iDataMaxWave = 0; //highest completed wave
var aDataMaxWave = ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30', 'W31', 'W32', 'W33', 'W34', 'W35', 'W36', 'W37', 'W38', 'W39', 'W40']; //list of completed waves
var aDataElapsedTime = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var iDataElapsedTimeAvg = 0;
var aDataStrafeTime = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var iDataStrafeTimeAvg = 0;
var iDataWalkTimeAvg = 0;
var aDataElapsedWaveCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataAttMelee = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataAttMeleeCh = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataAttRange = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataAttRangeCh = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var iDataAttMeleeAvg = 0;
var iDataAttMeleeChAvg = 0;
var iDataAttRangeAvg = 0;
var iDataAttRangeChAvg = 0;
var aDataGameLengths = []; //list of game lengths
var iDataShortestGame = 0; //fewest no of waves completed
var iDataLongestGame = 0; //biggest no of waves completed
var iDataAverageWaveTime = 0; //average no of waves completed
var iDataGameCompleteT1 = 0; //completed wave 01-05
var iDataGameCompleteT2 = 0; //completed wave 06-10
var iDataGameCompleteT3 = 0; //completed wave 11-15
var iDataGameCompleteT4 = 0; //completed wave 16-20
var iDataGameCompleteT5 = 0; //completed wave 21-25
var iDataGameCompleteT6 = 0; //completed wave 25-29
var iDataGameCompleteT7 = 0; //completed wave 30

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

    //GAME COMPLETION - WAVES COMPLETED PER GAME
    for (var i = 0; i < aCompleteData.length; i++) {
        //GET GAME IDS
        aDataIds.push(aCompleteData[i].id);
        //GET NO OF COMPLETED WAVE/ID
        aDataWaveCompletion[i] = aCompleteData[i].waveNo.length;
        //GET HIGHEST COMPLETED WAVE NUMBER
        var tempWave = getMaxOfArray(aCompleteData[i].waveNo);
        if (tempWave > iDataMaxWave) {
            iDataMaxWave = tempWave;
        }
        //GET AVERAGE TIME ELAPSED PER WAVE AND OCCURENCES OF WAVES
        for (j = 0; j < aCompleteData[i].elapsedTime.length; j++) {
            aDataElapsedWaveCount[j] += 1;
            aDataElapsedTime[j] += aCompleteData[i].elapsedTime[j];
            aDataStrafeTime[j] += aCompleteData[i].strafeTime[j];
        }

        //GET ARRAY OF COMPLETED GAMES PER OBJECT
        aDataGameLengths.push(aCompleteData[i].waveNo.length);

        //GET CUMULATED NUMER OF ATTACKS PER WAVES
        for (j = 0; j < aCompleteData[i].melee.length; j++) {
            aDataAttMelee[j] += aCompleteData[i].melee[j];
            aDataAttMeleeCh[j] += aCompleteData[i].meleeCh[j];
            aDataAttRange[j] += aCompleteData[i].range[j];
            aDataAttRangeCh[j] += aCompleteData[i].rangeCh[j];
        }

        
    }
    //UPDATE ARRAY WITH HIGHEST COMPLETED WAVE NUMBER
    aDataMaxWave = aDataMaxWave.slice(0, iDataMaxWave);

    //CALCULATE THE AVERAGE TIME ELAPSED PER WAVE
    aDataElapsedTime = aDataElapsedTime.slice(0, iDataMaxWave);

    aDataElapsedWaveCount = aDataElapsedWaveCount.slice(0, iDataMaxWave);
    for (i = 0; i < aDataElapsedTime.length; i++) {
        aDataElapsedTime[i] = Math.floor(aDataElapsedTime[i] / aDataElapsedWaveCount[i]);
    }

    //CALCULATE THE LONGEST, SHORTEST AND AVERAGE NO OF WAVES COMPLETED
    iDataLongestGame = getMaxOfArray(aDataGameLengths);
    iDataShortestGame = getMinOfArray(aDataGameLengths);
    iDataAverageWaveTime = Math.floor (Math.average.apply (Math, aDataGameLengths));

    //CALCULATE PYRAMID DATA - WHERE USERS STOP PLAYING
    for (i = 0; i < aDataWaveCompletion.length; i++) {
        if (aDataWaveCompletion[i] <= 5) {
            iDataGameCompleteT1 ++;
        } else if (aDataWaveCompletion[i] <= 10) {
            iDataGameCompleteT1 ++;
            iDataGameCompleteT2 ++;
        } else if (aDataWaveCompletion[i] <= 15) {
            iDataGameCompleteT1 ++;
            iDataGameCompleteT2 ++;
            iDataGameCompleteT3 ++;
        } else if (aDataWaveCompletion[i] <= 20) {
            iDataGameCompleteT1 ++;
            iDataGameCompleteT2 ++;
            iDataGameCompleteT3 ++;
            iDataGameCompleteT4 ++;
        } else if (aDataWaveCompletion[i] <= 25) {
            iDataGameCompleteT1 ++;
            iDataGameCompleteT2 ++;
            iDataGameCompleteT3 ++;
            iDataGameCompleteT4 ++;
            iDataGameCompleteT5 ++;
        } else if (aDataWaveCompletion[i] <= 29) {
            iDataGameCompleteT1 ++;
            iDataGameCompleteT2 ++;
            iDataGameCompleteT3 ++;
            iDataGameCompleteT4 ++;
            iDataGameCompleteT5 ++;
            iDataGameCompleteT6 ++;
        } else {
            iDataGameCompleteT1 ++;
            iDataGameCompleteT2 ++;
            iDataGameCompleteT3 ++;
            iDataGameCompleteT4 ++;
            iDataGameCompleteT5 ++;
            iDataGameCompleteT6 ++;
            iDataGameCompleteT7 ++;
        }
    }

    //CALCULATE THE AVERAGE STRAFE TIME OVERALL
    aDataStrafeTime = aDataStrafeTime.slice(0, iDataMaxWave);
    iDataStrafeTimeAvg = Math.floor(Math.average.apply (Math, aDataStrafeTime));
    iDataElapsedTimeAvg = Math.floor(Math.average.apply (Math, aDataElapsedTime));
    iDataWalkTimeAvg = iDataElapsedTimeAvg - iDataStrafeTimeAvg;

    //CALCULATE THE AVERAGE ATTACKS PER WAVE
    aDataAttMelee = aDataAttMelee.slice(0, iDataMaxWave);
    aDataAttMeleeCh = aDataAttMeleeCh.slice(0, iDataMaxWave);
    aDataAttRange = aDataAttRange.slice(0, iDataMaxWave);
    aDataAttRangeCh = aDataAttRangeCh.slice(0, iDataMaxWave);
    for (i = 0; i < aDataElapsedTime.length; i++) {
        aDataAttMelee[i] = Math.floor(aDataAttMelee[i] / aDataElapsedWaveCount[i]);
        aDataAttMeleeCh[i] = Math.floor(aDataAttMeleeCh[i] / aDataElapsedWaveCount[i]);
        aDataAttRange[i] = Math.floor(aDataAttRange[i] / aDataElapsedWaveCount[i]);
        aDataAttRangeCh[i] = Math.floor(aDataAttRangeCh[i] / aDataElapsedWaveCount[i]);
    }

    //CALCULATE THE OVERALL AVERAGE ATTACKS USED
    iDataAttMeleeAvg = Math.floor(Math.average.apply (Math, aDataAttMelee));
    iDataAttMeleeChAvg = Math.floor(Math.average.apply (Math, aDataAttMeleeCh));
    iDataAttRangeAvg = Math.floor(Math.average.apply (Math, aDataAttRange));
    iDataAttRangeChAvg = Math.floor(Math.average.apply (Math, aDataAttRangeCh));

    //DEBUG
    console.log(aCompleteData);
}

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}

Math.average = function() {
    var cnt, tot, i;
    cnt = arguments.length;
    tot = i = 0;
    while (i < cnt) tot+= arguments[i++];
    return tot / cnt;
};


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
       $("#fileList").html("<p style=\"display: inline;color: grey;\">" + aFileListInput + "</p>");
       $('#showCharts').removeClass('hidden');
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