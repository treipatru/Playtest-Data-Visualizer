### What is this? ###

* The Data Visualizer is a data analysis web tool.
* It takes as input JSON files saved by [Curse of Mermos](http://www.indiedb.com/games/curse-of-mermos1) at the end of a play session.
* The tool is designed to work with small amounts of data at once; no more than 500 can be selected at the same time.
* Because of the limited quantity of data, the tool is doing all the processing locally, in the browser. If a lot of files are loaded you might notice a bit of lag on import.
* Keep in mind that it is meant to be run in the studio LAN so by design it is not very network efficient.

### What do I need to run it? ###

The serverside file processing is done with a BASH script (not included in the repo) and the web part is HTML/CSS/JavaScript. I've also used the following libraries and resources:

* [HTML 5 Boilerplate](http://html5boilerplate.com/)
* [jQuery](http://www.indiedb.com/games/curse-of-mermos1)
* [HighCharts](http://jquery.com)
* [Flat Icon](http://flaticon.com/)
* [Google Fonts](http://www.google.com/fonts)

In order to run this you only need to deploy it on a webserver. All external libraries are included except for the fonts which are hosted by Google.

It has been tested and works as intended on Firefox 34+, Chrome 39+ and Internet Explorer 11. Works on mobile but a big screen is definitely recommended.

Also consider that each data set is a separate http request from the server. Although the tool will not process more than 500 data sets at a time the requests will still be made to the server.


### How do I use it? ###

**Before** you try to view any reports:

* Check that the savedata folder contains the playtest files which you want to load.
* If you have changed the contents of the savedata folder run the Re-Index script from the top left menu.

!Only the contents of the savedata folder are used for reports. If you remove files from there they are also removed from the database on next Re-Index! This allows you absolute freedom to import/remove data but be cautious when deleting.

**After** the desired data is loaded:

1. Select a time frame to read the files.
2. If viewing single reports also select the specific data set you wish to load.
3. ???
4. Profit!

If after you re-index the data you don't see the new data sets you might need to clear your browser cache.

### Contribution ###

This probably won't be of use for another project as it uses very specific data and outputs very specific analysis but feel free to poke around (the code is decently commented) and use what you can for your own projects.


### Who do I talk to? ###

Made by Andrei TreiPatru. [Say hi!](mailto:andrei@planet34.org)

### License ###
Playtest Data Visualizer is licensed under an  MIT license.