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


//MODAL DIALOGUE BOX
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

//CHARTS
$(function(){
  $("#showCharts").click(function(){
   //Hide the help div and load the charts div
   $("#dataNotLoaded").hide();
   $("#allCharts").show();

   //Display Chart #1
   $('#chartWaveCompletion').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Waves Completed Per Game'
    },

    legend: {
        enabled: false
    },
        xAxis: { //List of all loaded FILES
            categories: ['Game01','Game02','Game03','Game04','Game05','Game06','Game07','Game08','Game09','Game10','Game11','Game12','Game13','Game14','Game15','Game16','Game17','Game18','Game19','Game20','Game21','Game22']
        },
        yAxis: {
            min: 0,
            max: 30,
            title: {
                text: 'Wave Finished'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} waves</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{ //Length(+1) of Waves array for each loaded file
            name: 'Completed ',
            data: [2,17,16,4,9,18,8,24,21,14,11,7,30,19,8, 15, 20, 11, 7, 10, 23, 21, 24, 9, 26]

        }]
    });
   //Display Chart #2
   $(function () {
    $('#chartSoulsCollection').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Waves Versus Souls Collection'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Wave Number'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            allowDecimals: false
        },
        yAxis: {
            floor: 0,
            title: {
                text: 'Souls Collected'
            }
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'Wave Number {point.x}, Collected {point.y} souls'
                }
            }
        },
        series: [{
            name: 'Game01',//FILENAME(Data Object)
            // color: 'rgba(223, 83, 83, .5)',
            data: [[1, 10],[2,30],[3, 60], [4, 70], [5,100]] //1st digit is wave number, 2nd digit is souls collected
        }, {
            name: 'Game02',
            // color: 'rgba(223, 83, 200, .5)',
            data: [[1, 8],[2,49],[3, 42], [4, 5], [5,105], [6,105], [7,12], [8,190], [9,230], [10,450]]
        }, {
            name: 'Game03',
            // color: 'rgba(2, 83, 83, .5)',
            data: [[1, 7],[2,38],[3, 20], [4, 85], [5,110]]
        }, {
            name: 'Game04',
            // color: 'rgba(223, 250, 83, .8)',
            data: [[1, 8],[2,49],[3, 42], [4, 5], [5,105]]
        }
        ]
    });
});
   //Display Chart #3
   $(function () {
    $('#chartAttackTypes').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Cumulated Attacks Breakdown'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Attack Type',
            innerSize: '0%',
            data: [ //Add each type of attack and assign it to lower values - percentage coversion is automatic
            ['Melee', 35],
            ['Ch.Melee', 5],
            ['Range', 15],
            ['Ch.Range', 25],
            ]
        }]
    });
});   
   //Display Chart #4
   $(function () {
    $('#chartAttackTypesPerWave').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Attacks Distribution'
        },
        subtitle: {
            text: 'Averaged from all selected play sessions'
        },
        xAxis: {
            categories: ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Percent'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.0f}%</b> ({point.y:,.0f} hits)<br/>',
            shared: true
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff'
                }
            }
        },
            series: [{//Each number is an average calculated per wave from all data sources
                name: 'Melee',
                data: [178,177,156,134,173,122,138,157,172,164,171,157,107,187,185,166,147,171,122,147,141,131,176,137,100,139,144,234,100,168]
            }, {
                name: 'Charged Melee',
                data: [0,0,0,0,0,0,34,27,34,34,17,27,33,39,31,34,31,37,32,29,20,30,26,32,26,36,26,36,25,27]
            }, {
                name: 'Range',
                data: [58,89,84,52,94,132,113,78,78,67,89,78,133,114,120,71,82,67,79,69,78,125,118,102,87,131,76,73,129,68]
            }, {
                name: 'Charged Range',
                data: [0,0,0,0,0,0,0,0,0,56,49,45,68,57,42,56,61,53,52,59,54,53,49,62,47,55,60,60,65,66]
            }]
        });
});

   //Display Chart #5
   $(function () {
    $('#chartWalkingStrafing').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'In-Game Movement'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Seconds spent',
            data: [
                ['Walking',   160],//Average Elapsed time - strafing time
                ['Strafing',   90]//Average Strafe Time
                ]
            }]
        });
});
   //Display Chart #5
   $(function () {
    $('#chartShardsCollection').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Waves Versus Shards Collection'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Wave Number'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            allowDecimals: false
        },
        yAxis: {
            floor: 0,
            title: {
                text: 'Souls Collected'
            }
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'Wave Number {point.x}, Collected {point.y} souls'
                }
            }
        },
        series: [{
            name: 'Game01',//FILENAME(Data Object)
            // color: 'rgba(223, 83, 83, .5)',
            data: [[1, 10],[2,30],[3, 60], [4, 70], [5,100]] //1st digit is wave number, 2nd digit is souls collected
        }, {
            name: 'Game02',
            // color: 'rgba(223, 83, 200, .5)',
            data: [[1, 4],[2,45],[3, 50], [4, 80], [5,120]]
        }, {
            name: 'Game03',
            // color: 'rgba(2, 83, 83, .5)',
            data: [[1, 7],[2,38],[3, 20], [4, 85], [5,110]]
        }, {
            name: 'Game04',
            // color: 'rgba(223, 250, 83, .8)',
            data: [[1, 8],[2,49],[3, 42], [4, 5], [5,105]]
        }
        ]
    });
});
   //Display Chart #6
   $('#chartWaveTime').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Average Time Elapsed Per Wave'
    },

    legend: {
        enabled: false
    },
        xAxis: { //List of Max number of waves
            categories: ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'SECONDS'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} seconds</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{ //Average of time elapsed of all waves/objects
            name: 'Time Elapsed ',
            data: [5,28,36,45,48,53,58,58,63,80,86,92,117,119,120,132,144,166,166,181,193,204,212,237,247,291,292,299,314,390]

        }]
    });
   //Display Chart #6
$(function () {
    $('#chartMapHeatMap').highcharts({

        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40
        },


        title: {
            text: 'Rooms Heatmap Per Wave'
        },

        xAxis: {
            categories: ['Throne Room', 'Heart Room', 'Armory Room', 'Book Room', 'Treasure Room']
        },

        yAxis: {
            categories: ['W01','W02','W03','W04','W05'],
            title: null
        },

        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 320
        },

        tooltip: {
            formatter: function () {
                return 'Players spent ' + this.point.value + ' seconds in the <br>' + '<b>' + this.series.xAxis.categories[this.point.x]
                 + '</b>' + ' in ' + '<b>' + this.series.yAxis.categories[this.point.y] + '<b>';
                // return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                //     this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },

        series: [{
            name: 'Seconds Per Room',
            borderWidth: 1,
            data: [
                [0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67],
                [1, 0, 10], [1, 1, 19], [1, 2, 8], [1, 3, 24], [1, 4, 67],
                [2, 0, 10], [2, 1, 19], [2, 2, 8], [2, 3, 24], [2, 4, 67],
                [3, 0, 10], [3, 1, 19], [3, 2, 8], [3, 3, 24], [3, 4, 67],
                [4, 0, 10], [4, 1, 19], [4, 2, 8], [4, 3, 24], [4, 4, 67],
                ],
            dataLabels: {
                enabled: true,
                color: 'black',
                style: {
                    textShadow: 'none',
                    HcTextStroke: null
                }
            }
        }]

    });
});
   //End Display Charts
 });
});



//Toggle Charts Sections On/Off
$(function(){
    $("#gameCompletionTitle").click(function(){
        $("#chartWaveCompletion").toggle();
        $("#chartWaveCompletionAvg").toggle();
        $("#chartWaveTime").toggle();
        $("#chartGameTime").toggle();
    });
    $("#combatStatisticsTitle").click(function(){
        $("#chartAttackTypes").toggle();
        $("#chartWalkingStrafing").toggle();
        $("#chartAttackTypesPerWave").toggle();
    });
    $("#healthProgressionTitle").click(function(){
    });
    $("#collectiblesTitle").click(function(){
    });
    $("#shopTitle").click(function(){
    });
    $("#mapTitle").click(function(){
    });
});