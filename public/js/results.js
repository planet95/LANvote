var chart;
var rooms = null;

socket = io.connect();

socket.on('newresults', function(data){
$('#spndata').text(JSON.stringify(data.rooms));
});

  function requestData(){
    var data = $.parseJSON($('#spndata').text());
    chartdata = [];
    labels = [];
    $.each(data.rows,function(i,item){
    chartdata.push(item.value);
    labels.push(item.key[1]);
    });
    chart.series[0].setData(chartdata);
    chart.xAxis[0].setCategories(labels,true);
    setTimeout(requestData, 3000);
}
 
 //setTimeout(requestData, 3000);    

$(document).ready(function(){
    var labels = [];
var chartdata = [];
var totalVotesInRooms = "Total Votes All Rooms";
var dps = $.parseJSON($('#spndata').text());
$.each(dps.rows,function(i,item){
chartdata.push(item.value);
labels.push(item.key[1]);
});

chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chartContainer',
                type: 'column'
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
          series: [{name:'Room1',data:chartdata}]
        });

});
        
