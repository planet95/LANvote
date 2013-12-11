var uname = prompt('what is your name?', 'Cody') || 'NoneChosen';
       socket = io.connect();
       socket.emit('ready', uname);
       socket.on('name', function(data){
         $('#lblname').append(' ' +uname);
     });
     
     
    
        
