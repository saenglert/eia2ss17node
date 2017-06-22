/// <reference path="../vendor/node.d.ts" />
import http = require("http");
import url = require("url");

namespace server_example {
    let http = require("http");
    let server: http.Server = http.createServer(onRequest);
    server.listen(process.env.port || 8100);

    function onRequest(_request: http.IncomingMessage, _response: http.ServerResponse): void {
        let data: Buffer[] = [];
        _request.on("error", onError);
        _request.on("data", function (_chunk: Buffer) {
            data.push(_chunk);
        });
        _request.on("end", function () {
            console.log(JSON.parse(data.concat().toString()))
        });
    }

    function onError(_error: Error) {
        console.log(_error);
    }

    /*function onData(_chunk: Buffer) {
        data.push(_chunk);
    }

    function onEnd(): void {
        console.log(JSON.parse(data.concat().toString()))
    }*/
}