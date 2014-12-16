//#############################################################################
//#############################################################################
//
// DISPLAY CHARTS FOR THE REPORT PAGE
//
//#############################################################################
//#############################################################################


$(function(){
  $("#showCharts").click(function(){
    $("#fileList").slideToggle("fast");
    $("#showCharts").hide();
    $("#textGameLength").text("Shortest game was " + iDataShortestGame + " waves while the longest game was " + iDataLongestGame + " waves.");
    $("#textGameAverage").text("The average game is ended at wave " + iDataAverageGameLength + ".");
    $("#textWavesShort").text("Fastest wave was completed in as little as " + iDataShortestWave + " seconds.");
    $("#textWavesLong").text("Longest wave took " + iDataLongestWave + " seconds to finish.");
    $("#textAverageWave").text("The average time a player has spent in-game was " + iDataAverageGameTimeS + " seconds " + "(" + iDataAverageGameTimeM + " minutes).");
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
            categories: aDataIds            
        },
        yAxis: {
            min: 0,
            max: 30,
            title: {
                text: 'Waves Finished'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{black};padding:0">{series.name}: </td>' +
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
        series: [{
            name: 'Completed ',
            color: Highcharts.getOptions().colors[3],
            data: aDataWaveCompletion

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
            text: 'Game progress Breakdown',
            x: -50
        },
        subtitle: {
            text: '# of players that completed each game segment',
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
            ['W01-05', iDataGameCompleteT1],
            ['W06-10', iDataGameCompleteT2],
            ['W11-15', iDataGameCompleteT3],
            ['W16-20', iDataGameCompleteT4],
            ['W21-25', iDataGameCompleteT5],
            ['W25-29', iDataGameCompleteT6],
            ['W30+', iDataGameCompleteT7],
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
            categories: aDataMaxWave
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
            '<td style="padding:0"><b> {point.y} seconds</b></td></tr>',
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
            name: 'Time Elapsed',
            color: Highcharts.getOptions().colors[1],
            data: aDataElapsedTime

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
            ['Melee', iDataAttMeleeAvg],
            ['Ch.Melee', iDataAttMeleeChAvg],
            ['Range', iDataAttRangeAvg],
            ['Ch.Range', iDataAttRangeChAvg],
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
            name: 'Time spent',
            data: [
                ['Walking', iDataWalkTimeAvg],
                ['Strafing', iDataStrafeTimeAvg]
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
            categories: aDataMaxWave,
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
                data: aDataAttMelee
            }, {
                name: 'Charged Melee',
                data: aDataAttMeleeCh
            }, {
                name: 'Range',
                data: aDataAttRange
            }, {
                name: 'Charged Range',
                data: aDataAttRangeCh
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
                enabled: false,
                text: 'Wave Number'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            minorTickInterval: 1,
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
        series: aDataHealthWaveGame
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
            categories: aDataMaxWave,
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
            categories: aDataMaxWave
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
            text: 'Percentage Of Souls Collected In Each Wave Per Game'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            title: {
                enabled: false,
                text: 'Wave Number'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            minorTickInterval: 1,
            allowDecimals: false
        },
        yAxis: {
            min: 0,
            max: 100,
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
                    pointFormat: 'Wave Number {point.x}, Collected {point.y}% of souls'
                }
            }
        },
        series: aDataSoulsWaveGame
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
            text: 'Percentage Of Shards Collected In Each Wave Per Game'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            title: {
                enabled: false,
                text: 'Wave Number'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            minorTickInterval: 1,
            allowDecimals: false
        },
        yAxis: {
            min: 0,
            max: 100,
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
                    pointFormat: 'Wave Number {point.x}, Collected {point.y}% of shards'
                }
            }
        },
        series: aDataShardsWaveGame
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
            text: null,
            x: -20
        },
        xAxis: {
            categories: aDataMaxWave
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
            data: aDataSoulsWaveAvg
        }, {
            name: 'Shards',
            data: aDataShardsWaveAvg
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
            categories: aDataMaxWave,
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
            categories: aDataMaxWave,
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
            categories: aDataMaxWave,
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
            categories: aDataMaxWave,
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