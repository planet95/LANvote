 var socket = null;
 var uname = null;
 $(function () {
     socket = io.connect();
    // socket.emit('ready', uname);
    /*
    create room when new id is added onto url. index will show list of rooms on server. admin will show results from each room. 
    */
});

 function sendVote(btn) {
      var msg = $(btn);
      var loc = window.location;
      var pathName = loc.pathname;

      $("#list div").sort(function(){
    return Math.random()*10 > 5 ? 1 : -1;
}).each(function(){
    var $t = $(this), id = $t.attr("id"),
        bg = $t.find("button").css("background-image"),btn = $t.find("button");
    btn.css("background-image", bg).appendTo($t);
    $t.attr('id', id).appendTo($t.parent());
    
});


if(pathName.split('/').length <= 2){
        pathName = 'LAN Vote';}
else
    {
        pathName = pathName.split('/')[2];
    }
      socket.emit('votecast', {'value':msg.attr('id'),'room':pathName, 'session':socket.socket.sessionid});
      socket.emit('rtrvresults', {id: pathName});
       socket.emit('rtrvdata');
     }


