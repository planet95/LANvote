 $(document).ready(function(){
    var title = "Incoming Vote";
     var data = {
        "item1" : 0, "item 2" : 5,
     "item 3" : 1, "item 4" : 5,
     "item 5" : 4, "item 6" : 5,
     "item 7" : 4, "item 8" : 5,
     "item 9" : 4, "item 10" : 4,
     "item 11" : 4, "item 12" : 4};
     
     
   var items = [];
   $.each(data, function(name, votes) {

          items.push('<div id="li_'+name+'"><a onclick=vote(' + votes + ',"'+name+'")>' + name + '</a><button class="punch"> ' +votes +'</button></div>');

   });  // close each()

   $('#list').append( items.join('') );
    $('#list li').selectable();
   
   $('h1').html(title);
    });

function vote(id, name) {
    /* $.each(data, function(name, votes) {
        if (name == 'id') {
            alert('found ya');
        }
     });*/
    alert(id);//code
    $('#li'+ name).html();
    
}