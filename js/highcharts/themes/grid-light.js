/**
 * Grid-light theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
	href: 'http://fonts.googleapis.com/css?family=Open+Sans:300,400',
	rel: 'stylesheet',
	type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
	colors: ["#4D4D4D", "#5DA5DA", "#FAA43A", "#60BD68", "#F17CB0", "#B2912F", "#B276B2",
		"#DECF3F", "#F15854", "#6A833D", "#CDC4D2", "#76D39C", "#C99337", "#B0787B", "#A1D749"],
	chart: {
		backgroundColor: null,
		style: {
			fontFamily: "Open Sans, sans-serif"
		}
	},
	title: {
		style: {
			fontSize: '16px',
			fontWeight: 'bold',
			textTransform: 'uppercase'
		}
	},
	tooltip: {
		borderWidth: 0,
		backgroundColor: 'rgba(150,150,150,0.8)',
		shadow: false
	},
	legend: {
		itemStyle: {
			fontWeight: 'bold',
			fontSize: '11px'
		}
	},
	xAxis: {
		gridLineWidth: 1,
		labels: {
			style: {
				fontSize: '12px'
			}
		}
	},
	yAxis: {
		minorTickInterval: 'auto',
		title: {
			style: {
				textTransform: 'uppercase'
			}
		},
		labels: {
			style: {
				fontSize: '12px'
			}
		}
	},
	plotOptions: {
		candlestick: {
			lineColor: '#404048'
		}
	},


	// General
	background2: '#F0F0EA'
	
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);