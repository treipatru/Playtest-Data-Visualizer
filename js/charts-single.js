//#############################################################################
//#############################################################################
//
// DISPLAY CHARTS FOR THE SINGLE VIEW PAGE
// andrei@planet34.org
//
//#############################################################################
//#############################################################################


$(function(){
  $("#showChartsSingle").click(function(){
    fCrunchData();
    $("#fileList , #singleTitle, #singleObjectSelector, #showChartsSingle").toggle("fast");
    $("#allCharts").show();
    
    //CHANGE SEPARATOR TITLE
    $("#loadedObjTitle").removeClass().addClass('separatorTitle');
    $("#loadedObjTitle").html("<p>" + oSelectedObject.id + "</p>");
    
    //WRITE GAME COMPLETION STATISTICS
    $("#textShortestWave").html("<p>Fastest wave was completed in as little as <b>" + iDataShortestWave + "</b> seconds.</p>");
    $("#textLongestWave").html("<p>Longest wave took <b>" + iDataLongestWave + "</b> seconds to finish.</p>");
    $("#textGameTime").html("<p>The player has spent <b>" + iDataElapsedGameTimeS + "</b> seconds in game " + "(<b>" + iDataElapsedGameTimeM + "</b> minutes).</p>");

    //WRITE SHOP STATISTICS
    $("#textPotionsBought").html("<p>The player has bought a total of <b>" + iDataTotalPotionsB + "</b> potions</p>");


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
        text: 'Time Elapsed Per Wave'
    },

    legend: {
        enabled: false
    },
        xAxis: { //List of Max number of waves
            categories: aDataObjWave
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
            ['Melee', iDataAttMeleeSum],
            ['Ch.Melee', iDataAttMeleeChSum],
            ['Range', iDataAttRangeSum],
            ['Ch.Range', iDataAttRangeChSum],
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
                ['Walking', iDataWalkTimeSum],
                ['Strafing', iDataStrafeTimeSum]
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
            categories: aDataObjWave,
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
                data: oSelectedObject.melee
            }, {
                name: 'Charged Melee',
                data: oSelectedObject.meleeCh
            }, {
                name: 'Range',
                data: oSelectedObject.range
            }, {
                name: 'Charged Range',
                data: oSelectedObject.rangeCh
            }]
        });
});





//#############################################################################
// HEALTH PROGRESSION
//#############################################################################





// AVERAGE HEALTH LOST PER WAVE VS POTIONS AND REVIVES
//-----------------------------------------------------------------------------
$(function () {
    $('#chartHealthAveragePotionsRevives').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'HP Lost Per Wave VS Use Of Potions And Revives'
        },
        xAxis: [{
            categories: aDataObjWave,
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
            data: oSelectedObject.healthLost,
        }, {
            name: 'Potions',
            type: 'spline',
            yAxis: 0,
            data: oSelectedObject.potionsUsed,
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
        }, {
            name: 'Revives',
            type: 'spline',
            yAxis: 0,
            data: oSelectedObject.revives
        }]
    });
});




//#############################################################################
// COLLECTIBLES
//#############################################################################





// SOULS DROPPED VERSUS COLLECTED
//-----------------------------------------------------------------------------
$(function () {
    $('#chartSoulsCollected').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Dropped/Collected Souls'
        },
        subtitle: {
            text: null
        },
        xAxis: {
            allowDecimals: false,
        },
        yAxis: {
            title: {
                text: 'No. Of Souls'
            },
        },
        tooltip: {
            shared: true,
            pointFormat: '<b>{point.y:,.0f}</b> {series.name}<br/>'
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: true,
                    symbol: 'circle',
                    radius: 4,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Souls Dropped',
            color: 'rgb(69, 96, 204)',
            data: oSelectedObject.soulsDrop
        }, {
            name: 'Souls Collected',
            color: 'rgb(50, 50, 50)',
            data: oSelectedObject.soulsCol
        }]
    });
});


// SOULS DROPPED VERSUS COLLECTED
//-----------------------------------------------------------------------------
$(function () {
    $('#chartShardsCollected').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Dropped/Collected Shards'
        },
        subtitle: {
            text: null
        },
        xAxis: {
            allowDecimals: false,
        },
        yAxis: {
            title: {
                text: 'No. Of Shards'
            },
        },
        tooltip: {
            shared: true,
            pointFormat: '<b>{point.y:,.0f}</b> {series.name}<br/>'
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: true,
                    symbol: 'circle',
                    radius: 4,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Shards Dropped',
            color: 'rgb(219, 179, 20)',
            data: oSelectedObject.shardsDrop
        }, {
            name: 'Shards Collected',
            color: 'rgb(50, 50, 50)',
            data: oSelectedObject.shardsCol
        }]
    });
});





//#############################################################################
// SHOP STATISTICS
//#############################################################################





// UPGRADE TABLE
//-----------------------------------------------------------------------------
    $("#tableUpgrades").find("p").remove();
    $("#tableUpgradesVIT").append("<p class=\"tableRowHead\">VIT</p>");
    $("#tableUpgradesSTR").append("<p class=\"tableRowHead\">STR</p>");
    $("#tableUpgradesDEX").append("<p class=\"tableRowHead\">DEX</p>");
    $("#tableUpgradesAGI").append("<p class=\"tableRowHead\">AGI</p>");
    $("#tableUpgradesWave").append("<p class=\"tableRowHead\">W</p>");
    $("#tableGlyphsVIT").append("<p class=\"tableRowHead\">VIT</p>");
    $("#tableGlyphsSTR").append("<p class=\"tableRowHead\">STR</p>");
    $("#tableGlyphsMIS").append("<p class=\"tableRowHead\">MIS</p>");
    for (i = 0; i < oSelectedObject.waveNo.length; i++) {
        var sUpgradeType = null;
        var sUpgradeTier = null;
        var sGlyphType = null;
        var sGlyphTier = null;
    
    //TEST FOR UPGRADE TIER
        for (j = 0; j < oSelectedObject.upgrades[i].length; j++) {
        if (/(T)1\w{3}/g.test(oSelectedObject.upgrades[i][j])) {
            sUpgradeTier = "T1";
        } else if (/(T)2\w{3}/g.test(oSelectedObject.upgrades[i][j])) {
            sUpgradeTier = "T2";
        } else if (/(T)3\w{3}/g.test(oSelectedObject.upgrades[i][j])) {
            sUpgradeTier = "T3";
        }  else if (/(T)4\w{3}/g.test(oSelectedObject.upgrades[i][j])) {
            sUpgradeTier = "T4";
        }  else if (/(T)5\w{3}/g.test(oSelectedObject.upgrades[i][j])) {
            sUpgradeTier = "T5";
        } else if (oSelectedObject.upgrades[i][j] === "None") {
            sUpgradeTier = "N";
        }
    }
    //TEST FOR UPGRADE TYPE
    for (j = 0; j < oSelectedObject.upgrades[i].length; j++) {
        if (/.{2}(STR)/g.test(oSelectedObject.upgrades[i][j])) {
            sUpgradeType = "STRENGTH";
        } else if (/.{2}(AGI)/g.test(oSelectedObject.upgrades[i][j])) {
            sUpgradeType = "AGILITY";
        } else if (/.{2}(DEX)/g.test(oSelectedObject.upgrades[i][j])) {
            sUpgradeType = "DEXTERITY";
        }  else if (/.{2}(VIT)/g.test(oSelectedObject.upgrades[i][j])) {
            sUpgradeType = "VITALITY";
        } else if (oSelectedObject.upgrades[i][j] === "None") {
            sUpgradeType = "NONE";
        }
    }
    //TEST FOR GLYPH TIER
    for (j = 0; j < oSelectedObject.glyphBought[i].length; j++) {
        if (/.{3}\d1/g.test(oSelectedObject.glyphBought[i][j])) {
            sGlyphTier = "T1";
        } else if (/.{3}\d2/g.test(oSelectedObject.glyphBought[i][j])) {
            sGlyphTier = "T2";
        } else if (/.{3}\d3/g.test(oSelectedObject.glyphBought[i][j])) {
            sGlyphTier = "T3";
        } else if (oSelectedObject.glyphBought[i][j] === "None") {
            sGlyphTier = "N";
        }
    }
    //TEST FOR GLYPH TYPE
    for (j = 0; j < oSelectedObject.glyphBought[i].length; j++) {
        if (/(STR)\d{2}/g.test(oSelectedObject.glyphBought[i][j])) {
            sGlyphType = "STRENGTH";
        } else if (/(VIT)\d{2}/g.test(oSelectedObject.glyphBought[i][j])) {
            sGlyphType = "VITALITY";
        } else if (/(MIS)\d{2}/g.test(oSelectedObject.glyphBought[i][j])) {
            sGlyphType = "MISCELLANEOUS";
        } else if (oSelectedObject.glyphBought[i][j] === "None") {
            sGlyphType = "NONE";
        }
    }

        var tempWaveNo = aDataObjWave[i].slice(1,3);

        //WRITE UPGRADE VITALITY CELL
        if (sUpgradeType === "VITALITY") {
            $("#tableUpgradesVIT").append("<p class=\"" + sUpgradeTier + "\">" + sUpgradeTier + "</p>");
        } else {
            $("#tableUpgradesVIT").append("<p class=\"N\">N</p>");
        }

        //WRITE UPGRADE STRENGTH CELL
        if (sUpgradeType === "STRENGTH") {
            $("#tableUpgradesSTR").append("<p class=\"" + sUpgradeTier + "\">" + sUpgradeTier + "</p>");
        } else {
            $("#tableUpgradesSTR").append("<p class=\"N\">N</p>");
        }

        //WRITE UPGRADE DEXTERITY CELL
        if (sUpgradeType === "DEXTERITY") {
            $("#tableUpgradesDEX").append("<p class=\"" + sUpgradeTier + "\">" + sUpgradeTier + "</p>");
        } else {
            $("#tableUpgradesDEX").append("<p class=\"N\">N</p>");
        }

        //WRITE UPGRADE AGILITY CELL
        if (sUpgradeType === "AGILITY") {
            $("#tableUpgradesAGI").append("<p class=\"" + sUpgradeTier + "\">" + sUpgradeTier + "</p>");
        } else {
            $("#tableUpgradesAGI").append("<p class=\"N\">N</p>");
        }

        $("#tableUpgradesWave").append("<p class=\"tableCol\">" + tempWaveNo + "</p>");

        //WRITE GLYPH VITALITY CELL
        if (sGlyphType === "VITALITY") {
            $("#tableGlyphsVIT").append("<p class=\"" + sGlyphTier + "\">" + sGlyphTier + "</p>");
        } else {
            $("#tableGlyphsVIT").append("<p class=\"N\">N</p>");
        }

        //WRITE GLYPH STRENGTH CELL
        if (sGlyphType === "STRENGTH") {
            $("#tableGlyphsSTR").append("<p class=\"" + sGlyphTier + "\">" + sGlyphTier + "</p>");
        } else {
            $("#tableGlyphsSTR").append("<p class=\"N\">N</p>");
        }

        //WRITE GLYPH MISCELLANEOUS CELL
        if (sGlyphType === "MISCELLANEOUS") {
            $("#tableGlyphsMIS").append("<p class=\"" + sGlyphTier + "\">" + sGlyphTier + "</p>");
        } else {
            $("#tableGlyphsMIS").append("<p class=\"N\">N</p>");
        }
    }


// POTIONS PER WAVE
//-----------------------------------------------------------------------------
$('#chartPotionsPerWave').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Potions Bought Per Wave'
    },

    legend: {
        enabled: false
    },
        xAxis: { //List of Max number of waves
            categories: aDataObjWave
        },
        yAxis: {
            min: 0,
            minTickInterval: 1,
            title: {
                text: 'Potions'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b> {point.y} </b></td></tr>',
            footerFormat: '</table>',
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{ //Average of time elapsed of all waves/objects
            name: 'Potions Bought',
            color: Highcharts.getOptions().colors[4],
            data: oSelectedObject.potionsBought

        }]
    });

    //CLEAR OBJECT WAVES
    aDataObjWave = [];


// REPOSITION FOOTER
//-----------------------------------------------------------------------------
    stickyFooter();
});
});