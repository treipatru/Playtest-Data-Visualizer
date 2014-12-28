//#############################################################################
//#############################################################################
//
// CHARTS SINGLE VIEW
// Contains functions for calculating and displaying the single view data.
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
    $("#confirmationDialog").html("Are you sure you want to re-index?" + "<br>" + 
        "Make sure you have the correct files in the savedata folder before proceeding otherwise you might lose data!");

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

  $("#singleObjectSelector").change(function () {
    sSelectedObject = $("#singleObjectSelector").val();
    fExtractData();
});
});


function callback(value) {
    if (value) {
        window.location.href='http://gaserver/cgi-bin/updatefiles.cgi';
    } else {
        return;
    }
}

function stickyFooter(){
    var bodyHeight = $("body").height();
    var vwptHeight = $(window).height();
    if (vwptHeight > bodyHeight) {
        $("#footer").css("position","absolute").css("bottom",0);
    }else{
        $("#footer").css("position","").css("bottom","");
    }
}
$(document).ready(function() {
    stickyFooter();
});
$(window).resize(function() {
    stickyFooter();
});


// TOGGLE ON/OFF CHARTS SECTIONS
//-----------------------------------------------------------------------------


$(function(){
    $("#debug").click(function(){
        $("#fileList , #singleTitle, #singleObjectSelector, #showChartsSingle").slideToggle("fast");
    });
    
    $("#gameCompletionTitle").click(function(){
        $("#chartTimePerWave, #infoGametimeStats").slideToggle("fast");
    });
    $("#combatStatisticsTitle").click(function(){
        $("#chartAttackTypes, #chartWalkingStrafing, #chartAttackTypesPerWave").slideToggle("fast");
    });
    $("#healthProgressionTitle").click(function(){
        $("#chartHealthPlot").slideToggle("fast");
        $("#chartHealthAveragePotionsRevives").slideToggle("fast");
    });
    $("#collectiblesTitle").click(function(){
        $("#chartSoulsCollected, #chartShardsCollected").slideToggle("fast");
    });
    $("#shopTitle").click(function(){
        $("#upgradesTableTitle, #tableUpgrades, #chartPotionsPerWave, #infoShopStats").slideToggle("fast");
    });
    $("#mapTitle").click(function(){
        $("#chartMapHeatMap").slideToggle("fast");
    });
});





//#############################################################################
// GLOBAL VARIABLES
//#############################################################################




// DATA FOR MAIN FUNCTIONALITY
//-----------------------------------------------------------------------------


var oStartDate; //Date variable for the START datepicker
var oEndDate; //Date variable for the END datepicker
var aFileListInput = []; //Array with exact names of files to be imported
var aDatesList = []; //Array with all the days between start and end dates
var aPlaytestFiles = []; //Used to import all files on server
var sSelectedObject; //Name of selected data set
var oSingleObject;


// VARIABLES GENERATED FOR GRAPHS
//-----------------------------------------------------------------------------


//GENERAL

var iMaxNrOfWaves = 40; //Maximum number of waves that the game can have (by design, not data)
var aDataIds = []; //List of all loaded game IDs
var aDataMaxWave = ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10',
                    'W11','W12','W13','W14','W15','W16','W17','W18','W19','W20',
                    'W21','W22','W23','W24','W25','W26','W27','W28','W29','W30',
                    'W31', 'W32', 'W33', 'W34', 'W35', 'W36', 'W37', 'W38',
                    'W39', 'W40']; //Names of all possible waves
var aDataObjWave = [];

//GAME TIME
var iDataShortestWave = 0;
var iDataLongestWave = 0;
var iDataElapsedGameTimeS = 0;
var iDataElapsedGameTimeM = 0;
var iDataWalkTimeSum = 0;
var iDataStrafeTimeSum = 0;

//COMBAT DATA
var iDataAttMeleeSum = 0; //Average no of Melee attacks
var iDataAttMeleeChSum = 0; //Average no of MeleeCh attacks
var iDataAttRangeSum = 0; //Average no of Range attacks
var iDataAttRangeChSum = 0; //Average no of RangeCh attacks

//SHOP DATA
var aDataShopVIT = [];
var aDataShopSTR = [];
var aDataShopDEX = [];
var aDataShopAGI = [];
var iDataTotalPotionsB = 0;





//#############################################################################
// DEFINE MAIN FUNCTIONS TO BE CALLED WHEN PROGRAM IS INITIALIZED
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
    aDatesList = [];
    var oCurrentDate = new Date(oStartDate);
    while (oCurrentDate <= oEndDate) {
        aDatesList.push(new Date(oCurrentDate));
        oCurrentDate.setDate(oCurrentDate.getDate() + 1);
    }
    for (i = 0; i < aDatesList.length; i++) {
        aDatesList[i] = $.datepicker.formatDate ("yy-mm-dd", aDatesList[i]);
    }
}


// PARSE FILELIST, RETURN A LIST OF ITEMS AND 
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

    //RETURN INFORMATION TO INTERFACE
    if ( aFileListInput[0] === undefined) {
        fOutputLog ("nodataloaded");
        return;
    } else {
        fOutputLog ("dataloadsuccessful");
    }

});
}

// USE THE SELECTED OBJECT STRING AND RETRIEVE THAT INTO AN OBJECT
//-----------------------------------------------------------------------------

function fExtractData() {
    sSelectedObject = "data/" + sSelectedObject;
    $.ajax({
        url: sSelectedObject,
        async: false,
        dataType: 'json',
        success: function (response) {
            oSelectedObject = response;
            return oSelectedObject;
        }
    });
}


// DEBUG - CHECK IF DATA IS LOADED AND NOTIFY THE USER
//-----------------------------------------------------------------------------


function fOutputLog (situation) {
    if (situation === "noinput") {
        $("#debug").html("<p>" + "You must select two dates to validate." + "</p>");
        $("#debug").removeClass().addClass('debugFail');
        return;
    } else if (situation === "nodataloaded") {
        $("#debug").html("<p>" + "No data was loaded!" + "</p>");
        $("#debug").removeClass().addClass('debugFail');
        $("#fileList").find("p").remove();
        $("#singleObjectSelector").find("option").remove();
        fHideUI();
    } else if (situation === "dataloadsuccessful") {
       $("#debug").html("<p>" + aFileListInput.length + " data sets available!" + "</p>");
       $("#debug").removeClass().addClass('debugSuccess');
       $("#fileList").find("p").remove();
       $("#singleObjectSelector").find("option").remove();
       $("#singleObjectSelector").append("<option disabled selected>-- select data set --</option>");
       for (i = 0; i < aFileListInput.length; i++) {
        $("#fileList").append("<p>" + aFileListInput[i] + "</p>");
        $("#singleObjectSelector").append("<option>" + aFileListInput[i] + "</option>");
       }
       fShowUI();
    }
}

function fHideUI () {
    $("#fileList , #singleTitle, #singleObjectSelector, #showChartsSingle").removeClass().addClass('hidden');
    $("#allCharts").slideUp('slow');
    stickyFooter();
}

function fShowUI () {
    $("#fileList , #singleTitle, #singleObjectSelector, #showChartsSingle").removeClass('hidden');
    stickyFooter();
}


// HELPER FUNCTIONS
//-----------------------------------------------------------------------------


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

function fCreateArrayZeroes () {
    return Array.apply(null, new Array(iMaxNrOfWaves)).map(Number.prototype.valueOf,0);
}

function fSumArray (numArray) {
    var sum = 0;
    for (i = 0; i < numArray.length; i++) {
        sum += numArray[i];
    }
    return sum;
}

//#############################################################################
// COMPUTE DATA REQUIRED FOR THE CHARTS
//#############################################################################





function fCrunchData () {


// SET MAXIMUM WAVE NUMBER
//-------------------------------------------------------------------------

    aDataObjWave = aDataMaxWave.slice(0, oSelectedObject.waveNo.length);

// GET GAME TIMES
//-------------------------------------------------------------------------

    iDataShortestWave = getMinOfArray(oSelectedObject.elapsedTime);
    iDataLongestWave = getMaxOfArray(oSelectedObject.elapsedTime);
    iDataElapsedGameTimeS = fSumArray(oSelectedObject.elapsedTime);
    iDataElapsedGameTimeM = Math.floor(iDataElapsedGameTimeS / 60);
    iDataStrafeTimeSum = Math.floor(fSumArray(oSelectedObject.strafeTime));
    iDataWalkTimeSum = iDataElapsedGameTimeS - iDataStrafeTimeSum;

// GET ATTACK USAGE
//-------------------------------------------------------------------------

    iDataAttMeleeSum = Math.floor(fSumArray(oSelectedObject.melee));
    iDataAttMeleeChSum = Math.floor(fSumArray(oSelectedObject.meleeCh));
    iDataAttRangeSum = Math.floor(fSumArray(oSelectedObject.range));
    iDataAttRangeChSum = Math.floor(fSumArray(oSelectedObject.rangeCh));

//GET TOTAL NUMBER OF POTIONS

    iDataTotalPotionsB = Math.floor(fSumArray(oSelectedObject.potionsBought));


    fClearAllData (); //EMPTY VALUES
}


// CLEAR DATA TO ALLOW REIMPORT WITHOUT PAGE REFRESH
//-------------------------------------------------------------------------


function fClearAllData () {
    aDataIds = [];
    aFileListInput = [];
    aDatesList = [];
    aPlaytestFiles = [];
}



//#############################################################################
// RUN THE SHOW WHEN LOAD DATA BUTTON IS CALLED
//#############################################################################





// DEFINE FUNCTION TO BE CALLED WHEN LOAD DATA IS INITIALIZED
//-----------------------------------------------------------------------------
$(function(){
  $("#dataValidation").click(function(){
    fSetDateVariables();

   if (oStartDate === null || oEndDate === null) {
    fOutputLog ("noinput");
    return;
   } else {
    //MAKE SURE THE ARRAY OF FILES IS EMPTY
    aFileListInput = [];
    fSetDateArray ();
    //DRAW THE REST OF THE FUCKING OWL
    fParseFilelist ();
    //TOGGLE STATUS AND CHART BUTTON, MOVE FOOTER
    $("#fileList, singleTitle, #singleObjectSelector, showChartsSingle").slideDown("fast");
    stickyFooter();
   }
  });
});