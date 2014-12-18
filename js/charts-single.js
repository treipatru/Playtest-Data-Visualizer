//#############################################################################
//#############################################################################
//
// DISPLAY CHARTS FOR THE SINGLE VIEW PAGE
//
//#############################################################################
//#############################################################################


$(function(){
  $("#showChartsSingle").click(function(){
    $("#fileList , #singleTitle, #singleObjectSelector, #showChartsSingle").toggle("fast");
    $("#allCharts").show();
    stickyFooter();

//#############################################################################
// GAME COMPLETION
//#############################################################################





// TIME TO COMPLETE EACH WAVE
//-----------------------------------------------------------------------------
$('#chartTimePerWave').highcharts({
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
            data: oSelectedObject.elapsedTime

        }]
    });



//
//-----------------------------------------------------------------------------





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





//#############################################################################
// COLLECTIBLES
//#############################################################################





//#############################################################################
// SHOP STATISTICS
//#############################################################################





   fClearAllData();
});
});