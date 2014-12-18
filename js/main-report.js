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
        $("#fileList").slideToggle("fast");
        $("#showCharts").slideToggle("fast");
    });
    
    $("#gameCompletionTitle").click(function(){
        $("#chartWaveCompletion").slideToggle("fast");
        $("#infoWaveCompletion").slideToggle("fast");
        $("#chartWaveTime").slideToggle("fast");
        $("#chartWavePyramid").slideToggle("fast");
        $("#infoGametimeStats").slideToggle("fast");
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
        $("#infoShopStats").slideToggle("fast");
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


var oStartDate; //date variable for the START datepicker
var oEndDate; //date variable for the END datepicker
var aFileListInput = []; //array with exact names of files to be imported
var aDatesList = []; //array with all the days between start and end dates
var aPlaytestFiles = []; //used to import all files on server
var aCompleteData = []; //array containing all imported objects


// VARIABLES GENERATED FOR GRAPHS
//-----------------------------------------------------------------------------


//GENERAL

var iMaxNrOfWaves = 40; //Maximum number of waves that the game can have (by design, not data)
var aDataIds = []; //List of all loaded game IDs
var bDataShowLabels = true; //Used to hide labels in charts if there are too many data sets loaded 
var aDataWaveCompletion = []; //How many waves are completed in each data set
var iDataMaxWave = 0; //Highest completed wave from all data sets
var aDataMaxWave = ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10',
                    'W11','W12','W13','W14','W15','W16','W17','W18','W19','W20',
                    'W21','W22','W23','W24','W25','W26','W27','W28','W29','W30',
                    'W31', 'W32', 'W33', 'W34', 'W35', 'W36', 'W37', 'W38',
                    'W39', 'W40']; //Names of all possible waves

//TIME
var aDataElapsedTime = fCreateArrayZeroes();
var aDataElapsedTimeObject = []; //Elapsed time for each individual data set
var iDataElapsedTime = 0; //Cumulated length of time for all data sets
var aDataStrafeTimeObject = []; //List of strafe time per data set
var iDataStrafeTimeAvg = 0; //Average of strafe time for all data sets
var iDataWalkTimeAvg = 0; //Average of walk time for all data sets
var aDataElapsedWaveCount = fCreateArrayZeroes(); //No of times each was has been completed from all data
var iDataShortestWave = 0; //Time of shortest wave played
var iDataLongestWave = 0; //Time of longest wave played
var iDataAverageGameTimeS = 0; //Average time of a game in seconds
var iDataAverageGameTimeM = 0; //Average time of a game in minutes

//ATTACK
var aDataAttMelee = fCreateArrayZeroes(); //Cumulated no of Melee attacks in all dat sets
var aDataAttMeleeCh = fCreateArrayZeroes(); //Cumulated no of MeleeCh attacks in all dat sets
var aDataAttRange = fCreateArrayZeroes(); //Cumulated no of Range attacks in all dat sets
var aDataAttRangeCh = fCreateArrayZeroes(); //Cumulated no of RangeCh attacks in all dat sets
var iDataAttMeleeAvg = 0; //Average no of Melee attacks
var iDataAttMeleeChAvg = 0; //Average no of MeleeCh attacks
var iDataAttRangeAvg = 0; //Average no of Range attacks
var iDataAttRangeChAvg = 0; //Average no of RangeCh attacks

//GAMES LENGTH
var aDataGameLengths = []; //List of game lengths
var iDataShortestGame = 0; //Shortest no of waves completed
var iDataLongestGame = 0; //Highest no of waves completed
var iDataAverageGameLength = 0; //Average no of waves completed
var iDataGameCompleteT1 = 0; //Completed wave 01-05
var iDataGameCompleteT2 = 0; //Completed wave 06-10
var iDataGameCompleteT3 = 0; //Completed wave 11-15
var iDataGameCompleteT4 = 0; //Completed wave 16-20
var iDataGameCompleteT5 = 0; //Completed wave 21-25
var iDataGameCompleteT6 = 0; //Completed wave 25-29
var iDataGameCompleteT7 = 0; //Completed wave 30 or more

//HEALTH AND REVIVES
var aDataHealthWaveGame = []; //Health lost/Wave (HighCharts scatter plot)
var aDataHealthLostAvg = fCreateArrayZeroes(); //Average heath lost per wave
var aDataRevivesAvg = fCreateArrayZeroes(); //Average revives per wave

//SOULS AND SHARDS
var aDataSoulsWaveGame = []; //Percentages of of souls collected/wave (HighCharts scatter plot)
var aDataSoulsWaveAvg = fCreateArrayZeroes(); //Average souls collection per waves in all data sets
var aDataShardsWaveGame = []; //Percentages of of shards collected/wave (HighCharts scatter plot)
var aDataShardsWaveAvg = fCreateArrayZeroes(); //Average shard collection per waves in all data sets

//POTIONS
var aDataPotionsBoughtAvg = fCreateArrayZeroes(); //Average potions bought per waves
var aDataPotionsUsedAvg = fCreateArrayZeroes(); //Average Potions used per wave
var iDataTotalPotionsB = 0; //Total potions bought
var iDataTotalPotionsU = 0; //Total potions used
var iDataAveragePotionB = 0; //Average of potions bought per length of game

//UPGRADES AND GLYPHS
var aDataUpgradesT1 = fCreateArrayZeroes(); //Cumulated T1 Upgrades per wave
var aDataUpgradesT2 = fCreateArrayZeroes(); //Cumulated T2 Upgrades per wave
var aDataUpgradesT3 = fCreateArrayZeroes(); //Cumulated T3 Upgrades per wave
var aDataUpgradesT4 = fCreateArrayZeroes(); //Cumulated T4 Upgrades per wave
var aDataUpgradesT5 = fCreateArrayZeroes(); //Cumulated T5 Upgrades per wave
var aDataGlyphsSTR = fCreateArrayZeroes();  //Cumulated STR glyphs per wave
var aDataGlyphsVIT = fCreateArrayZeroes();  //Cumulated STR glyphs per wave
var aDataGlyphsMIS = fCreateArrayZeroes();  //Cumulated STR glyphs per wave
var iDataUpgradesAvg = 0;                   //Average Upgrades per game
var iDataGlyphsAvg = 0;                     //Average Glyphs per game





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
    } else if (situation === "dataloadsuccessful") {
       $("#debug").html("<p>" + aCompleteData.length + " data sets loaded!" + "</p>");
       $("#debug").removeClass().addClass('debugSuccess');
       $("#fileList").find("p").empty();
       for (i = 0; i < aFileListInput.length; i++) {
        $("#fileList").append("<p>" + aFileListInput[i] + "</p>");
       }
       $("#fileList").removeClass('hidden');
       $("#showCharts").removeClass('hidden');
    }
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

//#############################################################################
// COMPUTE DATA REQUIRED FOR THE CHARTS
//#############################################################################





function fCrunchData () {


// RUN THROUGH EACH LOADED OBJECT AND EXTRACT DATA
//-------------------------------------------------------------------------


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


        //USE LENGTH OF WAVES PLAYED TO GO THROUGH OBJECT PROPERTIES CONTENTS
        for (j = 0; j < aCompleteData[i].waveNo.length; j++) {
            //GET TOTAL TOTAL NUMBER OF WAVES
            aDataElapsedWaveCount[j] += 1;
            //GET TOTAL ELAPSED TIME PER WAVE
            aDataElapsedTime[j] += aCompleteData[i].elapsedTime[j];
            //GET CUMULATED NUMER OF ATTACKS PER WAVES
            aDataAttMelee[j] += aCompleteData[i].melee[j];
            aDataAttMeleeCh[j] += aCompleteData[i].meleeCh[j];
            aDataAttRange[j] += aCompleteData[i].range[j];
            aDataAttRangeCh[j] += aCompleteData[i].rangeCh[j];
            //GET CUMULATED HEALTH LOST PER WAVES
            aDataHealthLostAvg[j] += aCompleteData[i].healthLost[j];
            //GET CUMULATED POTIONS BOUGHT PER WAVES
            aDataPotionsBoughtAvg[j] += aCompleteData[i].potionsBought[j];
            //GET CUMULATED POTIONS USED PER WAVES
            aDataPotionsUsedAvg[j] += aCompleteData[i].potionsUsed[j];
            //GET CUMULATED REVIVES PER WAVES
            aDataRevivesAvg[j] += aCompleteData[i].revives[j];
        }


        //GET LONGEST AND SHORTEST WAVE TIMES FOR ALL OBJECTS LOADED
        var tempHighest = getMaxOfArray(aCompleteData[i].elapsedTime);
        if (tempHighest > iDataLongestWave) {iDataLongestWave = tempHighest;}
        var tempLowest = getMinOfArray(aCompleteData[i].elapsedTime);
        if (tempLowest > iDataShortestWave) {iDataShortestWave = tempLowest;}


        //GET AVERAGE ELAPSED TIME AND STRAFE TIME PER OBJECT
        var tempStrafeAverage = Math.floor(Math.average.apply (Math, aCompleteData[i].strafeTime));
        var tempElapsedAverage = Math.floor(Math.average.apply (Math, aCompleteData[i].elapsedTime));
        aDataElapsedTimeObject.push (tempElapsedAverage);
        aDataStrafeTimeObject.push (tempStrafeAverage);


        //GET ARRAY OF COMPLETED GAMES PER OBJECT
        aDataGameLengths.push(aCompleteData[i].waveNo.length);


        //GET ARRAY OF HEALTH LOST PER WAVE PER EACH OBJECT
        var tempHealthDataMacro = [];
        for (j = 0; j <aCompleteData[i].waveNo.length; j++ ) {
            var tempHealthDataMicro = [];
            tempHealthDataMicro.push(aCompleteData[i].waveNo[j]);
            tempHealthDataMicro.push(aCompleteData[i].healthLost[j]);
            tempHealthDataMacro.push(tempHealthDataMicro);
        }
        aDataHealthWaveGame[i] = {};
        aDataHealthWaveGame[i].name = aCompleteData[i].id;
        aDataHealthWaveGame[i].color = 'rgba(223, 83, 83, .5)';
        aDataHealthWaveGame[i].data = tempHealthDataMacro;


        //GET ARRAY OF PERCENTAGE OF SOULS COLLECTED PER WAVE PER EACH OBJECT
        var tempSoulsMacro = [];
        for (j = 0; j<aCompleteData[i].waveNo.length; j++) {
            var tempSoulsMicro = [];
            var tempSoulsPercent = Math.floor((aCompleteData[i].soulsCol[j] / aCompleteData[i].soulsDrop[j]) * 100);
            if (aCompleteData[i].soulsCol[j] === 0 || aCompleteData[i].soulsDrop[j] === 0) {tempSoulsPercent = 0;}
            aDataSoulsWaveAvg[j] += tempSoulsPercent;
            tempSoulsMicro.push(aCompleteData[i].waveNo[j]);
            tempSoulsMicro.push(tempSoulsPercent);
            tempSoulsMacro.push(tempSoulsMicro);
        }
        aDataSoulsWaveGame[i] = {};
        aDataSoulsWaveGame[i].name = aCompleteData[i].id;
        aDataSoulsWaveGame[i].color = 'rgba(83, 83, 223, .5)';
        aDataSoulsWaveGame[i].data = tempSoulsMacro;


        //GET ARRAY OF PERCENTAGE OF SHARDS COLLECTED PER WAVE PER EACH OBJECT
        var tempShardsMacro = [];
        for (j = 0; j<aCompleteData[i].waveNo.length; j++) {
            var tempShardsMicro = [];
            var tempShardsPercent = Math.floor((aCompleteData[i].shardsCol[j] / aCompleteData[i].shardsDrop[j]) * 100);
            if (aCompleteData[i].shardsCol[j] === 0 || aCompleteData[i].shardsDrop[j] === 0) {tempShardsPercent = 0;}
            aDataShardsWaveAvg[j] += tempShardsPercent;
            tempShardsMicro.push(aCompleteData[i].waveNo[j]);
            tempShardsMicro.push(tempShardsPercent);
            tempShardsMacro.push(tempShardsMicro);
        }
        aDataShardsWaveGame[i] = {};
        aDataShardsWaveGame[i].name = aCompleteData[i].id;
        aDataShardsWaveGame[i].color = 'rgba(255, 158, 3, .5)';
        aDataShardsWaveGame[i].data = tempShardsMacro;


        //GET ARRAYS FOR CUMULATED TIER UPGRADES
        for (j = 0; j < aCompleteData[i].waveNo.length; j++) {
            for (k = 0; k < aCompleteData[i].upgrades[j].length; k++) {
                if (/(T)1\w{3}/g.test(aCompleteData[i].upgrades[j][k])) {
                    aDataUpgradesT1[j] ++;
                } else if (/(T)2\w{3}/g.test(aCompleteData[i].upgrades[j][k])) {
                    aDataUpgradesT2[j] ++;
                } else if (/(T)3\w{3}/g.test(aCompleteData[i].upgrades[j][k])) {
                    aDataUpgradesT3[j] ++;
                }  else if (/(T)4\w{3}/g.test(aCompleteData[i].upgrades[j][k])) {
                    aDataUpgradesT4[j] ++;
                }  else if (/(T)5\w{3}/g.test(aCompleteData[i].upgrades[j][k])) {
                    aDataUpgradesT5[j] ++;
                }
            }
        }


        //GET ARRAYS FOR CUMULATED GLYPH CATEGORY PURCHASES
        for (j = 0; j < aCompleteData[i].waveNo.length; j++) {
            for (k = 0; k < aCompleteData[i].glyphBought[j].length; k++) {
                if (/(STR)\d{2}/g.test(aCompleteData[i].glyphBought[j][k])) {
                    aDataGlyphsSTR[j] ++;
                } else if (/(VIT)\d{2}/g.test(aCompleteData[i].glyphBought[j][k])) {
                    aDataGlyphsVIT[j] ++;
                } else if (/(MIS)\d{2}/g.test(aCompleteData[i].glyphBought[j][k])) {
                    aDataGlyphsMIS[j] ++;
                }
            }
        }  
    }//END READING OBJECT DATA


// UPDATE AND CALCULATE EXTRACTED DATA
//-----------------------------------------------------------------------------


    //SHOW OR HIDE LABELS BASED ON NUMBER OF DATA SETS LOADED
    if (aCompleteData.length > 15) {
        bDataShowLabels = false;
    }


    //SET HIGHEST COMPLETED WAVE IN DATA SETS AND SLICE ARRAYS TO THAT LENGTH
    aDataMaxWave = aDataMaxWave.slice(0, iDataMaxWave);
    aDataElapsedTime = aDataElapsedTime.slice(0, iDataMaxWave);
    aDataElapsedWaveCount = aDataElapsedWaveCount.slice(0, iDataMaxWave);
    aDataAttMelee = aDataAttMelee.slice(0, iDataMaxWave);
    aDataAttMeleeCh = aDataAttMeleeCh.slice(0, iDataMaxWave);
    aDataAttRange = aDataAttRange.slice(0, iDataMaxWave);
    aDataAttRangeCh = aDataAttRangeCh.slice(0, iDataMaxWave);
    aDataHealthLostAvg = aDataHealthLostAvg.slice(0, iDataMaxWave);
    aDataRevivesAvg = aDataRevivesAvg.slice(0, iDataMaxWave);
    aDataPotionsBoughtAvg = aDataPotionsBoughtAvg.slice(0, iDataMaxWave);
    aDataPotionsUsedAvg = aDataPotionsUsedAvg.slice(0, iDataMaxWave);
    aDataUpgradesT1 = aDataUpgradesT1.slice(0,iDataMaxWave);
    aDataUpgradesT2 = aDataUpgradesT2.slice(0,iDataMaxWave);
    aDataUpgradesT3 = aDataUpgradesT3.slice(0,iDataMaxWave);
    aDataUpgradesT4 = aDataUpgradesT4.slice(0,iDataMaxWave);
    aDataUpgradesT5 = aDataUpgradesT5.slice(0,iDataMaxWave);
    aDataGlyphsSTR = aDataGlyphsSTR.slice(0,iDataMaxWave);
    aDataGlyphsVIT = aDataGlyphsVIT.slice(0,iDataMaxWave);
    aDataGlyphsMIS = aDataGlyphsMIS.slice(0,iDataMaxWave);
    aDataSoulsWaveAvg = aDataSoulsWaveAvg.slice(0, iDataMaxWave);
    aDataShardsWaveAvg = aDataShardsWaveAvg.slice(0, iDataMaxWave);


    //CALCULATE THE AVERAGE TIME ELAPSED PER WAVE
    for (i = 0; i < aDataElapsedTime.length; i++) {
        aDataElapsedTime[i] = Math.floor(aDataElapsedTime[i] / aDataElapsedWaveCount[i]);
    }


    //CALCULATE THE LONGEST, SHORTEST AND AVERAGE NO OF WAVES COMPLETED
    iDataLongestGame = getMaxOfArray(aDataGameLengths);
    iDataShortestGame = getMinOfArray(aDataGameLengths);
    iDataAverageGameLength = Math.floor (Math.average.apply (Math, aDataGameLengths));


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


    //GET AVERAGE GAME TIME
    for (i = 0; i < aDataElapsedTime.length; i++) {
        iDataAverageGameTimeS += aDataElapsedTime[i];
    }
    iDataAverageGameTimeS = Math.floor(iDataAverageGameTimeS/aCompleteData.length);
    iDataAverageGameTimeM = Math.floor(iDataAverageGameTimeS/60);


    //CALCULATE THE AVERAGE STRAFE, ELAPSED AND WALK TIME OVERALL
    iDataStrafeTimeAvg = Math.floor(Math.average.apply (aCompleteData.Math, aDataStrafeTimeObject));
    iDataElapsedTimeAvg = Math.floor(Math.average.apply (Math, aDataElapsedTimeObject));
    iDataWalkTimeAvg = iDataElapsedTimeAvg - iDataStrafeTimeAvg;


    //CALCULATE THE AVERAGE ATTACKS PER WAVE
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


    //CALCULATE THE AVERAGE HP LOST PER WAVE
    for (i = 0; i < aDataHealthLostAvg.length; i++) {
        aDataHealthLostAvg[i] = Math.floor(aDataHealthLostAvg[i] / aDataElapsedWaveCount[i]);
    }


    //CALCULATE THE AVERAGE POTIONS BOUGHT PER WAVE AND TOTAL BOUGHT OVERALL
    
    for (i = 0; i < aDataPotionsBoughtAvg.length; i++) {
        iDataTotalPotionsB += aDataPotionsBoughtAvg[i];
        aDataPotionsBoughtAvg[i] = Math.floor(aDataPotionsBoughtAvg[i] / aDataElapsedWaveCount[i]);
    }


    //CALCULATE THE FREQUENCY OF BUYING A POTION
    iDataAveragePotionB = Math.floor(iDataTotalPotionsB / aDataElapsedWaveCount.length);


    //CALCULATE THE AVERAGE POTIONS USED PER WAVE
    for (i = 0; i < aDataPotionsUsedAvg.length; i++) {
        iDataTotalPotionsU += aDataPotionsUsedAvg[i];
        aDataPotionsUsedAvg[i] = Math.floor(aDataPotionsUsedAvg[i] / aDataElapsedWaveCount[i]);
    }


    //REMOVE FREE POTIONS FROM THE USED ONES (2 FREE/GAME)
    iDataTotalPotionsU = iDataTotalPotionsU - (aDataIds.length * 2);


    //CALCULATE THE AVERAGE REVIVES USED PER WAVE
    for (i = 0; i < aDataRevivesAvg.length; i++) {
        aDataRevivesAvg[i] = Math.ceil(aDataRevivesAvg[i] / aDataElapsedWaveCount[i]);
    }


    //CALCULATE THE AVERATE # OF UPGRADES AND GLYPHS BOUGHT IN A GAME
    for (i = 0; i < iDataMaxWave; i++) {
        iDataUpgradesAvg += aDataUpgradesT1[i] + aDataUpgradesT2[i] + aDataUpgradesT3[i] + aDataUpgradesT4[i] + aDataUpgradesT5[i];
        iDataGlyphsAvg += aDataGlyphsSTR[i] + aDataGlyphsVIT[i] + aDataGlyphsMIS[i];
    }
    iDataUpgradesAvg = Math.floor(iDataUpgradesAvg / aDataIds.length);
    iDataGlyphsAvg = Math.ceil(iDataGlyphsAvg / aDataIds.length);


    //CALCULATE AVERAGE SOULS AND SHARDS PER WAVE FOR ALL DATA SETS
    for (i = 0; i < iDataMaxWave; i++) {
        aDataSoulsWaveAvg[i] = Math.floor(aDataSoulsWaveAvg[i] / aDataIds.length);
        aDataShardsWaveAvg[i] = Math.floor(aDataShardsWaveAvg[i] / aDataIds.length);
    }

    //CLEAR IMPORT DATA TO ALLOW RESELECT OF DATA WITHOUT REFRESH
    aFileListInput = [];
    aDatesList = [];
    aPlaytestFiles = [];
    aCompleteData = [];
}


// CLEAR ALL DATA FROM MEMORY TO ALLOW REIMPORT
//-------------------------------------------------------------------------


function fClearAllData () {
    aDataIds = [];
    bDataShowLabels = true;
    aDataWaveCompletion = [];
    iDataMaxWave = 0;
    aDataElapsedTime = fCreateArrayZeroes();
    aDataElapsedTimeObject = [];
    iDataElapsedTime = 0;
    aDataStrafeTimeObject = [];
    iDataStrafeTimeAvg = 0;
    iDataWalkTimeAvg = 0;
    aDataElapsedWaveCount = fCreateArrayZeroes();
    iDataShortestWave = 0;
    iDataLongestWave = 0;
    iDataAverageGameTimeS = 0;
    iDataAverageGameTimeM = 0;
    aDataAttMelee = fCreateArrayZeroes();
    aDataAttMeleeCh = fCreateArrayZeroes();
    aDataAttRange = fCreateArrayZeroes();
    aDataAttRangeCh = fCreateArrayZeroes();
    iDataAttMeleeAvg = 0;
    iDataAttMeleeChAvg = 0;
    iDataAttRangeAvg = 0;
    iDataAttRangeChAvg = 0;
    aDataGameLengths = [];
    iDataShortestGame = 0;
    iDataLongestGame = 0;
    iDataAverageGameLength = 0;
    iDataGameCompleteT1 = 0;
    iDataGameCompleteT2 = 0;
    iDataGameCompleteT3 = 0;
    iDataGameCompleteT4 = 0;
    iDataGameCompleteT5 = 0;
    iDataGameCompleteT6 = 0;
    iDataGameCompleteT7 = 0;
    aDataHealthWaveGame = [];
    aDataHealthLostAvg = fCreateArrayZeroes();
    aDataRevivesAvg = fCreateArrayZeroes();
    aDataSoulsWaveGame = [];
    aDataSoulsWaveAvg = fCreateArrayZeroes();
    aDataShardsWaveGame = [];
    aDataShardsWaveAvg = fCreateArrayZeroes();
    aDataPotionsBoughtAvg = fCreateArrayZeroes();
    aDataPotionsUsedAvg = fCreateArrayZeroes();
    iDataTotalPotionsB = 0;
    iDataTotalPotionsU = 0;
    iDataAveragePotionB = 0;
    aDataUpgradesT1 = fCreateArrayZeroes();
    aDataUpgradesT2 = fCreateArrayZeroes();
    aDataUpgradesT3 = fCreateArrayZeroes();
    aDataUpgradesT4 = fCreateArrayZeroes();
    aDataUpgradesT5 = fCreateArrayZeroes();
    aDataGlyphsSTR = fCreateArrayZeroes();
    aDataGlyphsVIT = fCreateArrayZeroes();
    aDataGlyphsMIS = fCreateArrayZeroes();
    iDataUpgradesAvg = 0;
    iDataGlyphsAvg = 0;
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
    //TOGGLE STATUS AND CHART BUTTON, MOVE FOOTER
    $("#fileList").slideToggle("fast");
    $("#showCharts").slideToggle("fast");
    stickyFooter();
   }
  });
});