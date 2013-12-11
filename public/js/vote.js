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
if(pathName.split('/').length <= 2){
        pathName = 'LAN Vote';}
else
    {pathName = pathName.split('/')[2];
        }

      socket.emit('votecast', {'value':msg.attr('id'),'room':pathName, 'session':socket.socket.sessionid});
      socket.emit('rtrvdata');
     }


