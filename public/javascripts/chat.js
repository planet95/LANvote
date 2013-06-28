var socket = null;

$(function() {

  var name = 'WebMatrix User';

  socket = io.connect();
  
  socket.on('connect', function () {


    $("#chat").append($("<div class=\"system\">you have connected</div>"));
  });
  socket.on('announcement', function(data) {
    $("#chat").append($("<div class=\"system\">announce:" + data.announcement.id + "</div>"));
  });

socket.on('votecast', function (data){
       $("#chat").append($("<div><span class=\"user\"> votecast: " + data.id +  ":&nbsp;</span></div>"));
  });

  $("#send").click(function(e){
    e.preventDefault();
    submitMessage();
  });

  $('#message').keypress(function(e) {
    if(e.which == 13)
      submitMessage();
  });

  $("#message").focus();
  
})

function submitMessage() {
  var msg = $("#message").val();
  $("#chat").append($("<div><span class=\"user-me\">me:&nbsp;</span>" + msg + "</div>"));
  $("#message").val('');

  socket.send(msg);
}