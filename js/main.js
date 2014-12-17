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
var oStartDate; //date variable for the START datepicker
var oEndDate; //date variable for the END datepicker
var aFileListInput = []; //array with exact names of files to be imported
var aDatesList = []; //array with all the days between start and end dates
var aPlaytestFiles = []; //used to import all files on server
var aCompleteData = []; //array containing all imported objects


// GRAPH ACCESSIBLE DATA
//-----------------------------------------------------------------------------

//GENERAL DATA
var aDataIds = []; //all loaded games
var bTextOverflowProtection = true;
var aDataWaveCompletion = []; //waves completed per games in aDataIds
var iDataMaxWave = 0; //highest completed wave
var aDataMaxWave = ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30', 'W31', 'W32', 'W33', 'W34', 'W35', 'W36', 'W37', 'W38', 'W39', 'W40']; //list of completed waves
//TIME DATA
var aDataElapsedTime = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataElapsedTimeObject = [];
var iDataElapsedTime = 0;
var aDataStrafeTimeObject = [];
var iDataStrafeTimeAvg = 0;
var iDataWalkTimeAvg = 0;
var aDataElapsedWaveCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var iDataShortestWave = 0;
var iDataLongestWave = 0;
var iDataAverageGameTimeS = 0;
var iDataAverageGameTimeM = 0;
//ATTACK DATA
var aDataAttMelee = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataAttMeleeCh = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataAttRange = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataAttRangeCh = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var iDataAttMeleeAvg = 0;
var iDataAttMeleeChAvg = 0;
var iDataAttRangeAvg = 0;
var iDataAttRangeChAvg = 0;
//GAMES LENGTH DATA
var aDataGameLengths = []; //list of game lengths
var iDataShortestGame = 0; //fewest no of waves completed
var iDataLongestGame = 0; //biggest no of waves completed
var iDataAverageGameLength = 0; //average no of waves completed
var iDataGameCompleteT1 = 0; //completed wave 01-05
var iDataGameCompleteT2 = 0; //completed wave 06-10
var iDataGameCompleteT3 = 0; //completed wave 11-15
var iDataGameCompleteT4 = 0; //completed wave 16-20
var iDataGameCompleteT5 = 0; //completed wave 21-25
var iDataGameCompleteT6 = 0; //completed wave 25-29
var iDataGameCompleteT7 = 0; //completed wave 30
//HEALTH AND REVIVES DATA
var aDataHealthWaveGame = []; //objects for HighCharts scatter plot (health lost/wave)
var aDataHealthLostAvg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataRevivesAvg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//SOULS AND SHARDS DATA
var aDataSoulsWaveGame = []; //objects for HighCharts scatter plot (% of souls collected/wave)
var aDataSoulsWaveAvg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //average souls collection per waves in all objects
var aDataShardsWaveGame = []; //objects for HighCharts scatter plot (% of shards collected/wave)
var aDataShardsWaveAvg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //average shard collection per waves in all objects
//POTIONS DATA
var aDataPotionsBoughtAvg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataPotionsUsedAvg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var iDataTotalPotionsB = 0; //total potions bought
var iDataTotalPotionsU = 0; //total potions used
var iDataAveragePotionB = 0; //average of potions bought per length of game
//UPGRADES AND GLYPHS DATA
var aDataUpgradesT1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataUpgradesT2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataUpgradesT3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataUpgradesT4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataUpgradesT5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataGlyphsSTR = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataGlyphsVIT = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDataGlyphsMIS = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var iDataUpgradesAvg = 0;
var iDataGlyphsAvg = 0;

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

    }//END LOOPING THROUGH IMPORTED OBJECTS


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

    //SHOW OR HIDE LABELS BASED ON NUMBER OF DATA SETS LOADED
    if (aCompleteData.length > 15) {
        bTextOverflowProtection = false;
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

    //CALCULATE THE AVERAGE HP LOST PER WAVE
    aDataHealthLostAvg = aDataHealthLostAvg.slice(0, iDataMaxWave);
    for (i = 0; i < aDataHealthLostAvg.length; i++) {
        aDataHealthLostAvg[i] = Math.floor(aDataHealthLostAvg[i] / aDataElapsedWaveCount[i]);
    }

    //CALCULATE THE AVERAGE POTIONS BOUGHT PER WAVE AND TOTAL BOUGHT OVERALL
    aDataPotionsBoughtAvg = aDataPotionsBoughtAvg.slice(0, iDataMaxWave);
    for (i = 0; i < aDataPotionsBoughtAvg.length; i++) {
        iDataTotalPotionsB += aDataPotionsBoughtAvg[i];
        aDataPotionsBoughtAvg[i] = Math.floor(aDataPotionsBoughtAvg[i] / aDataElapsedWaveCount[i]);
    }

    //CALCULATE THE FREQUENCY OF BUYING A POTION
    iDataAveragePotionB = Math.floor(iDataTotalPotionsB / aDataElapsedWaveCount.length);

    //CALCULATE THE AVERAGE POTIONS USED PER WAVE
    aDataPotionsUsedAvg = aDataPotionsUsedAvg.slice(0, iDataMaxWave);
    for (i = 0; i < aDataPotionsUsedAvg.length; i++) {
        iDataTotalPotionsU += aDataPotionsUsedAvg[i];
        aDataPotionsUsedAvg[i] = Math.floor(aDataPotionsUsedAvg[i] / aDataElapsedWaveCount[i]);
    }

    //REMOVE FREE POTIONS FROM THE USED ONES (ATM IT'S 2 FREE/GAME)
    iDataTotalPotionsU = iDataTotalPotionsU - (aDataIds.length * 2);

    //CALCULATE THE AVERAGE REVIVES USED PER WAVE
    aDataRevivesAvg = aDataRevivesAvg.slice(0, iDataMaxWave);
    for (i = 0; i < aDataRevivesAvg.length; i++) {
        aDataRevivesAvg[i] = Math.ceil(aDataRevivesAvg[i] / aDataElapsedWaveCount[i]);
    }

    //PRUNE LENGTH OF VARIOUS ARRAYS TO THE MAXWAVE COUNT
    aDataUpgradesT1 = aDataUpgradesT1.slice(0,iDataMaxWave);
    aDataUpgradesT2 = aDataUpgradesT2.slice(0,iDataMaxWave);
    aDataUpgradesT3 = aDataUpgradesT3.slice(0,iDataMaxWave);
    aDataUpgradesT4 = aDataUpgradesT4.slice(0,iDataMaxWave);
    aDataUpgradesT5 = aDataUpgradesT5.slice(0,iDataMaxWave);
    aDataGlyphsSTR = aDataGlyphsSTR.slice(0,iDataMaxWave);
    aDataGlyphsVIT = aDataGlyphsVIT.slice(0,iDataMaxWave);
    aDataGlyphsMIS = aDataGlyphsMIS.slice(0,iDataMaxWave);

    //CALCULATE THE AVERATE # OF UPGRADES AND GLYPHS BOUGHT IN A GAME

    for (i = 0; i < iDataMaxWave; i++) {
        iDataUpgradesAvg += aDataUpgradesT1[i] + aDataUpgradesT2[i] + aDataUpgradesT3[i] + aDataUpgradesT4[i] + aDataUpgradesT5[i];
        iDataGlyphsAvg += aDataGlyphsSTR[i] + aDataGlyphsVIT[i] + aDataGlyphsMIS[i];
    }
    iDataUpgradesAvg = Math.floor(iDataUpgradesAvg / aDataIds.length);
    iDataGlyphsAvg = Math.ceil(iDataGlyphsAvg / aDataIds.length);

    //PRUNE THE AVERAGE SOULS AND SHARDS ARRAYS TO THE LENGTH OF THE HIGHEST GAME
    aDataSoulsWaveAvg = aDataSoulsWaveAvg.slice(0, iDataMaxWave);
    aDataShardsWaveAvg = aDataShardsWaveAvg.slice(0, iDataMaxWave);
    for (i = 0; i < iDataMaxWave; i++) {
        aDataSoulsWaveAvg[i] = Math.floor(aDataSoulsWaveAvg[i] / aDataIds.length);
        aDataShardsWaveAvg[i] = Math.floor(aDataShardsWaveAvg[i] / aDataIds.length);
    }    

}

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray)
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

function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}


// DEBUG - CHECK IF DATA IS LOADED AND NOTIFY THE USER
//-----------------------------------------------------------------------------
function fOutputLog (situation) {
    if (situation === "noinput") {
        $("#debug").html("<p>" + "You must select two dates to validate." + "</p>");
        $('#debug').removeClass().addClass('debugFail');
        return;
    } else if (situation === "nodataloaded") {
        $("#debug").html("<p>" + "No data was loaded!" + "</p>");
        $('#debug').removeClass().addClass('debugFail');
    } else if (situation === "dataloadsuccessful") {
       $("#debug").html("<p>" + aCompleteData.length + " data sets loaded!" + "</p>");
       $('#debug').removeClass().addClass('debugSuccess');
       for (i = 0; i < aFileListInput.length; i++) {
        $("#fileList").append("<p>" + aFileListInput[i] + "</p>");
       }
       // $("#fileList").append("<p>" + aFileListInput.toString() + "</p>");
       $('#fileList').removeClass('hidden');
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