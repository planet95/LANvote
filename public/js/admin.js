var rooms = null;
var realchart;
socket = io.connect();

socket.on('newvotes', function(data){
var chartdata = [];
var labels = [];
$.each(data.rooms.rows,function(i,item){
chartdata.push(item.value);
labels.push(item.key);
});
realchart.xAxis[0].setCategories(labels,true);
realchart.series[0].setData(chartdata);

});

$(document).ready(function(){
var totalVotesInRooms = "Total Votes All Rooms";
var dps = $.parseJSON($('#lbldata').text());
var chartdata = [];
var labels = [];
$.each(dps.rows,function(i,item){
chartdata.push(item.value);
labels.push(item.key);
});
realchart = new Highcharts.Chart({
            chart: {
                renderTo: 'chartContainer',
                type: 'bar'
            },
            title: {
                text: 'Real-Time Graph of Votes'
            },
            subtitle: {
                text: 'a Tactical Pause production.'
            },
            xAxis: {
                categories: labels,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'votes',
                    align: 'high'
                }
            },
        //    series:dps
          series: [{data:chartdata}]
        });

});
        
