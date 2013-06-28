 var socket = null;
 var uname = null;
 $(function () {
      uname = prompt('what is your name?', 'Cody') || 'NoneChosen';
     socket = io.connect();

     socket.on('connect', function () {
         socket.emit('setname', name);
     });
     socket.on('announcement', function (data) {
     //    showAlert(data);
     });
 })
function showAlert(data){

    		$('#announce').avgrund({
			height: 200,
			holderClass: 'custom',
			showClose: true,
			showCloseText: 'Close',
			enableStackAnimation: true,
			onBlurContainer: '.container',
			template: '<p>'+ data.announcement +'</p>' +
			'<div>' +
			'</div>'
		});

		$('#announce').click();
}
function sendVote(btn, user) {
  var msg = $(btn);
 // $("#chat").append($("<div><span class=\"user-me\">me:&nbsp;</span>" + msg + "</div>"));
 // $("#message").val('');
  var loc = window.location;
  var pathName = loc.pathname;
  socket.emit('votecast', { });
  $.post(pathName , { name: msg.attr('id'), user: user });
}
 
 
 $(document).ready(function(){
     //var name = 'WebMatrix User';
    var title = "Incoming Vote";
   var items = [];
   var data = JSON.stringify(getJSON());
   var obj = $.parseJSON(data);
   $.each(obj, function(name, item) {
          items.push('<div id="li_'+name+'"><button id="btn_'+name+'" style="background-image: url('+item.icon+')"  onclick="sendVote(this, \''+uname+'\')" class="punch"></button></div>');
      //  $('#li_'+ name + ' button').css('background-image','url('+name+')');
   });

   $('#list').append( items.join('') );
 //   $('#list li').selectable();
   
 //  $('h1').html(title);
    });
 
 
function getJSON() {
  return {
   "tf2" : {"votes": 1, "icon": "http://img.booru.org/steambanners//images/5/4a66ab78bbcb79c07239dac0fa1a51f093837325.jpg" },
     "dota2" : {"votes": 2, "icon": "http://img.booru.org/steambanners//images/10/8892917b8c6a260aa3387e48e2787c9214c32391.png" },
     "l4d2" : {"votes": 3, "icon": "http://img.booru.org/steambanners//images/9/96d7b19dfbec825412d5a252f3310bf62f09694b.png" },
     "bf3" : {"votes": 4, "icon": "http://img.booru.org/steambanners//images/9/1f5d3ffa32763a9698cebbd0d4e5a399a6358de1.jpg" },
     "thhdn" : {"votes": 5, "icon": "http://img.booru.org/steambanners//images/5/34a67c35236ed4fef6a6d83f072767c1e7299686.png" },
     "tribes" : {"votes": 0, "icon": "http://img.booru.org/steambanners//images/5/bca4b3374f949c9f5add6e665fc944f86373bf67.jpg" },
     "cs" : {"votes": 6, "icon": "http://img.booru.org/steambanners//images/6/a4469c6c95e668a40cd6ccf4c0e6d4f78064c789.jpg" },
     "jk2" : {"votes": 0, "icon": "http://img.booru.org/steambanners//images/7/721935afeb0a1ae7a2e54bf4ddc4a6bdfe745fc3.png" },
     "inj" : {"votes": 7, "icon": "http://www.comicstalkblog.com/wp-content/uploads/2013/05/Injustice-Gods-Among-Us.png" },
     "ss3" : {"votes": 0, "icon": "http://img.booru.org/steambanners//images/6/b3ba6683f6ce00a234825a95c64d38625b3fcf21.jpg" },
     "utk" : {"votes": 8, "icon": "http://img.booru.org/steambanners//images/9/4e9abedd1e7cd5ef6122ab5c9fab3069802e21c8.png" },
     "weed" : {"votes": 0, "icon": "http://www.thcfinder.com/uploads/files/blunt-weed-party-weedup-thcf.jpg" }};}