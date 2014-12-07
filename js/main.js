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
      $("#debug").text("Data loaded!");
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
    $("#confirmationDialog").html("Are you sure you want to re-index the data? Make sure you have the correct files in the savedata folder before proceeding!");

    // Define the Dialog and its properties.
    $("#confirmationDialog").dialog({
        resizable: false,
        modal: true,
        title: "Re-Index",
        height: 250,
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
   
   //Display Chart #1
     $('#chartWaveCompletion').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Waves Completion / Game'
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
            showLastLabel: true
        },
        yAxis: {
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
   //Display Chart #3
   $(function () {
    $('#chartAttackTypes').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Cumulated<br>Attacks Breakdown',
            align: 'center',
            verticalAlign: 'middle',
            y: 60
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '70%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Attack Type',
            innerSize: '30%',
            data: [ //Add each type of attack and assign it to lower values - percentage coversion is automatic
                ['Melee', 25],
                ['Ch.Melee', 15],
                ['Range', 25],
                ['Ch.Range', 15],
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

   //End Display Charts
 });
});