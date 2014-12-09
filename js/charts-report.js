//#############################################################################
//#############################################################################
//
// DISPLAY CHARTS FOR THE REPORT PAGE
//
//#############################################################################
//#############################################################################


$(function(){
  $("#showCharts").click(function(){
     $("#allCharts").show();


//#############################################################################
// GAME COMPLETION
//#############################################################################


// WAVES COMPLETED PER GAME
//-----------------------------------------------------------------------------
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

// GAME COMPLETION PYRAMID
//-----------------------------------------------------------------------------
$(function () {
    $('#chartWavePyramid').highcharts({
        chart: {
            type: 'pyramid',
            marginRight: 100
        },
        title: {
            text: 'Game Completion',
            x: -50
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                }
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Players / Wave',
            data: [
            ['W01-10', 245],
            ['W11-20', 187],
            ['W21-29', 95],
            ['W30', 30]
            ]
        }]
    });
});

// AVERAGE TIME ELAPSED PER WAVE
//-----------------------------------------------------------------------------
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


//#############################################################################
// COMBAT STATISTICS
//#############################################################################


// CUMULATED ATTACKS BREAKDOWN
//-----------------------------------------------------------------------------
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

// IN-GAME MOVEMENT
//-----------------------------------------------------------------------------
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

// ATTACKS DISTRIBUTION
//-----------------------------------------------------------------------------
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


//#############################################################################
// HEALTH PROGRESSION
//#############################################################################


// HEALTH LOST PER WAVE
//-----------------------------------------------------------------------------
$(function () {
    $('#chartHealthPlot').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Health Lost Per Wave Per Game'
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
                text: 'HP Lost'
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
                    pointFormat: 'Wave Number <b>{point.x}</b>, Lost <b>{point.y}</b> HP'
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

// AVERAGE HEALTH LOST PER WAVE VS POTIONS AND REVIVES
//-----------------------------------------------------------------------------
$(function () {
    $('#chartHealthAveragePotionsRevives').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Average HP Lost Per Wave VS Use Of Potions And Revives'
        },
        xAxis: [{
            categories: ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30'],
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: 'POTIONS/REVIVES',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true,
            allowDecimals: false,
            min: 0

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'HP Lost',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 100,
            verticalAlign: 'top',
            y: 40,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'HP Lost',
            type: 'column',
            yAxis: 1,
            data: [6,9,12,6,59,63,0,60,24,61,0,9,42,161,80,171,111,323,226,62,471,386,174,327,151,366,420,237,457,173],
        }, {
            name: 'Potions',
            type: 'spline',
            yAxis: 0,
            data: [3,3,2,2,3,0,3,2,0,2,2,1,3,1,0,3,0,1,0,2,3,2,3,0,1,0,1,0,2,2],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
        }, {
            name: 'Revives',
            type: 'spline',
            yAxis: 0,
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,2,2,0,2,0,2,0,3,2,2,3,3,1]
        }]
    });
});



// AVERAGE USE OF POTIONS AND REVIVES PER WAVE
//-----------------------------------------------------------------------------
$(function () {
    $('#chartAveragePotionsRevives').highcharts({
        title: {
            text: 'Average Use Of Potions And Revives Per Waves',
            x: -20
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30']
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: [{
            name: 'Potions',
            data: [0,1,1,1,0,3,1,1,0,1,3,3,2,2,1,0,1,1,3,1,3,2,1,2,0,2,3,0,3,3]
        }, {
            name: 'Revives',
            data: [0,0,0,0,0,0,2,1,1,0,3,2,1,1,3,3,3,4,1,1,2,2,2,0,0,3,0,1,0,3]
        }]
    });
});


//#############################################################################
// COLLECTIBLES
//#############################################################################


// % OF SOULS COLLECTED PER WAVE
//-----------------------------------------------------------------------------
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


// % OF SHARDS COLLECTED PER WAVE
//-----------------------------------------------------------------------------
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


// AVERAGE OF SOULS AND SHARDS COLLECTION
//-----------------------------------------------------------------------------
$(function () {
    $('#chartAverageSoulsShards').highcharts({
        title: {
            text: 'Average Collection Of Souls And Shards',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30']
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'PERCENTAGE COLLECTED'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: [{
            name: 'Souls',
            data: [71,67,67,39,22,77,48,95,74,98,86,88,72,84,24,94,91,31,49,87,24,64,56,68,49,90,95,32,24,100]
        }, {
            name: 'Shards',
            data: [0,0,0,0,0,0,0,94,87,99,73,73,91,92,98,92,93,84,76,67,77,97,61,75,96,74,87,81,76,82]
        }]
    });
});


//#############################################################################
// SHOP STATISTICS
//#############################################################################


// POTIONS BOUGHT
//-----------------------------------------------------------------------------
$(function () {
    $('#chartShopPotions').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Potions Bought'
        },
        subtitle: {
            text: 'Averaged per wave from all selected data'
        },
        xAxis: {
            categories: ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30'],
            title: {
                text: null
            },
            labels: {
                style: {
                    fontSize: '10px'
                }
            },
            allowDecimals: false,
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                overflow: 'justify',
            },
            allowDecimals: false
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,            
                    formatter: function(){
                        var val = this.y;
                        if (val === 0) {
                            return null;
                        }
                        return val;
                    }

                }
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true,
            enabled: false
        },
        series: [{
            name: 'Potions',
            data: [1,1,1,0,2,2,2,0,1,2,2,2,0,1,0,1,1,1,0,0,0,0,0,0,1,0,2,1,0,1]
        }]
    });
});

// UPGRADES BOUGHT
//-----------------------------------------------------------------------------
$(function () {
    $('#chartShopUpgrades').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Upgrades Bought'
        },
        subtitle: {
            text: 'Averaged per wave from all selected data'
        },
        xAxis: {
            categories: ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30'],
            title: {
                text: null
            },            
            labels: {
                style: {
                    fontSize: '10px'
                }
            },
            allowDecimals: false
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                overflow: 'justify',
            },
            allowDecimals: false
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false,
                    //Hide values of 0 from the data labels
                    formatter: function(){
                        console.log(this);
                        var val = this.y;
                        if (val === 0) {
                            return null;
                        }
                        return val;
                    }

                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 420,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true,
            enabled: true
        },
        series: [{
            name: 'Tier 1',
            data: [0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }, {
            name: 'Tier 2',
            data: [0,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }, {
            name: 'Tier 3',
            data: [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0]
        }, {
            name: 'Tier 4',
            data: [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0]
        }]
    });
});

// GLYPHS BOUGHT
//-----------------------------------------------------------------------------
$(function () {
    $('#chartShopGlyphs').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Glyphs Bought'
        },
        subtitle: {
            text: 'All items bought from all selected data'
        },
        xAxis: {
            categories: ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30'],
            title: {
                text: null
            },
            labels: {
                style: {
                    fontSize: '10px'
                }
            },
            allowDecimals: false,
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                overflow: 'justify',
            },
            allowDecimals: false
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,            
                    formatter: function(){
                        var val = this.y;
                        if (val === 0) {
                            return null;
                        }
                        return val;
                    }

                }
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true,
            enabled: false
        },
        series: [{
            name: 'Potions',
            data: [1,1,1,0,2,2,2,0,1,2,2,2,0,1,0,1,1,1,0,0,0,0,0,0,1,0,2,1,0,1]
        }]
    });
});


//#############################################################################
// MAP DATA
//#############################################################################


// MAP AREAS HEATMAP
//-----------------------------------------------------------------------------
$(function () {
    $('#chartMapHeatMap').highcharts({

        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40
        },

        title: {
            text: 'Level Areas Heatmap'
        },

        xAxis: {
            categories: ['Throne Room', 'Heart Room', 'Armory Room', 'Book Room', 'Treasure Room']
        },

        yAxis: {
            categories: ['W01','W02','W03','W04','W05', 'W06', 'W07','W08'],
            title: null
        },

        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: '#F50A0A'
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
                return 'Players spent ' + this.point.value + ' seconds in the <br>' + '<b>' + this.series.xAxis.categories[this.point.x] +
                '</b>' + ' in ' + '<b>' + this.series.yAxis.categories[this.point.y] + '<b>';
                // return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                //     this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },

        series: [{
            name: 'Seconds Per Room',
            borderWidth: 1,
            data: [
            [0, 0, 35], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0],[0,5,0],
            [1, 0, 80], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0],[1,5,0],
            [2, 0, 90], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2,5,0],
            [3, 0, 120], [3, 1, 0], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3,5,0],
            [4, 0, 80], [4, 1, 148], [4, 2, 29], [4, 3, 109], [4, 4, 122], [4,5,0],
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