 var socket = null;

$(function() {

  var name = prompt('what is your name?', 'Cody') || 'Cody';
  //var name = 'WebMatrix User';

  socket = io.connect();
  
  socket.on('connect', function () {
    socket.emit('setname', name);
  });
  socket.on('announcement', function(data) {
//    $("#chat").append($("<div class=\"system\">" + data.announcement + "</div>"));
  });

  socket.on('message', function (data) {
//    $("#chat").append($("<div><span class=\"user\">" + data.message[0] + ":&nbsp;</span>" + data.message[1] + "</div>"));
  });	

  socket.on('messages', function (data) {
  //	for (var i=0; i<data.buffer.length; i++) {
  //  	$("#chat").append($("<div><span class=\"user\">" + data.buffer[i].message[0] + ":&nbsp;</span>" + data.buffer[i].message[1] + "</div>"));
  //  } 
  });

  $("button").click(function(e){
    e.preventDefault();
    sendVote(this);
  });

})

function sendVote(btn) {
  var msg = $(btn);
 // $("#chat").append($("<div><span class=\"user-me\">me:&nbsp;</span>" + msg + "</div>"));
 // $("#message").val('');
  socket.emit('votecast', { id: msg.attr('id')});
}
 
 
 $(document).ready(function(){
    var title = "Incoming Vote";
    
     
   var items = [];
   var data = JSON.stringify(getJSON());
   var obj = $.parseJSON(data);
   $.each(obj, function(name, item) {
          items.push('<div id="li_'+name+'"><button id="btn_'+name+'" style="background-image: url('+item.icon+')"  onclick=sendVote(this) class="punch"></button></div>');
        $('#li_'+ name + ' button').css('background-image','url('+name+')');
   });

   $('#list').append( items.join('') );
 //   $('#list li').selectable();
   
 //  $('h1').html(title);
    });
 
 
function getJSON() {
  return {
   "item1" : {"votes": 1, "icon": "http://img.booru.org/steambanners//images/5/4a66ab78bbcb79c07239dac0fa1a51f093837325.jpg" },
     "item2" : {"votes": 2, "icon": "http://img.booru.org/steambanners//images/10/8892917b8c6a260aa3387e48e2787c9214c32391.png" },
     "item3" : {"votes": 3, "icon": "http://img.booru.org/steambanners//images/9/96d7b19dfbec825412d5a252f3310bf62f09694b.png" },
     "item4" : {"votes": 4, "icon": "http://img.booru.org/steambanners//images/9/1f5d3ffa32763a9698cebbd0d4e5a399a6358de1.jpg" },
     "item5" : {"votes": 5, "icon": "http://img.booru.org/steambanners//images/5/34a67c35236ed4fef6a6d83f072767c1e7299686.png" },
     "item6" : {"votes": 0, "icon": "http://img.booru.org/steambanners//images/5/bca4b3374f949c9f5add6e665fc944f86373bf67.jpg" },
     "item7" : {"votes": 6, "icon": "http://img.booru.org/steambanners//images/6/a4469c6c95e668a40cd6ccf4c0e6d4f78064c789.jpg" },
     "item8" : {"votes": 0, "icon": "http://img.booru.org/steambanners//images/7/721935afeb0a1ae7a2e54bf4ddc4a6bdfe745fc3.png" },
     "item9" : {"votes": 7, "icon": "http://www.comicstalkblog.com/wp-content/uploads/2013/05/Injustice-Gods-Among-Us.png" },
     "item10" : {"votes": 0, "icon": "http://img.booru.org/steambanners//images/6/b3ba6683f6ce00a234825a95c64d38625b3fcf21.jpg" },
     "item11" : {"votes": 8, "icon": "http://img.booru.org/steambanners//images/9/4e9abedd1e7cd5ef6122ab5c9fab3069802e21c8.png" },
     "item12" : {"votes": 0, "icon": "http://www.thcfinder.com/uploads/files/blunt-weed-party-weedup-thcf.jpg" }};}