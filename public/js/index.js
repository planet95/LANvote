var uname = prompt('what is your name?', 'User') || 'NoneChosen';
       socket = io.connect();
       socket.emit('ready', uname);
       socket.on('name', function(data){
         $('#lblname').append(' ' +uname);
     });
     
     
    
        
