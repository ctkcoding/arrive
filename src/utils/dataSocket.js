exports.openSocket = function(io) {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
          });
    });

    exports.newUserTab = function(userMap) {
        let liveData = Array.from(userMap, function(entry) {
            return {user: entry[0], wordCount: entry[1]};
          });
        console.log("emitting: ", liveData);
        io.emit('userTab',liveData);
    }
}


