var bitress = {
    App: {
        lang: "en"
    },
    Util: {
        dataTables: {}
    },
    Http: {
        system_monitoring: 'http://192.168.0.125:5000'
    }
};


const table_logs = new simpleDatatables.DataTable("#table_logs");
bitress.Util.dataTables = table_logs;


/**
 * Fetch the camera feed from the Python API
 */
bitress.Util.cameraFeed = function(){
    alert("hello")
}

bitress.Util.checkServerStatus = function(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("Server is online");
            } else {
                console.log("Server is offline or returned an error status");
            }
        })
        .catch(error => {
            console.log("Error: Server is offline or unreachable");
        });
}

// Example usage:
bitress.Util.checkServerStatus('https://example.com/api/endpoint');

