/// <reference path="../vendor/node.d.ts" />

import http = require("http");
import url = require("url");

// http://localhost:8100/?test=hallo&test=welt&test=!&super=toll&under=thebridge

namespace server_example {
    let optionen: string[] = ["A", "B", "C"];
    interface RequestParameters {
        [key: string]: string | string[];
    }

    let http = require("http");
    let server: http.Server = http.createServer(onRequest);
    server.listen(process.env.port || 8100);

    function onRequest(_request: http.IncomingMessage, _response: http.ServerResponse): void {
        console.log(_request.url);
        let parameters: RequestParameters = url.parse(_request.url, true).query;
        console.log(parameters);

        _response.statusCode = 200;
        _response.setHeader("Content-Type", ["text/html", "charset=utf-8"]);
        _response.setHeader("Content-Encoding", "UTF-8");

        _response.write("Ihre Auswahl: ");
        // of vs in! Round 1! FIGHT!
        for (let key in parameters) {
            console.log(key);
            _response.write(parameters[key]);
        }

        _response.write("Vielen Dank für Ihre Bestellung");

        _response.end();
    }
}