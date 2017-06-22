"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_example;
(function (server_example) {
    var http = require("http");
    var server = http.createServer(onRequest);
    server.listen(process.env.port || 8100);
    function onRequest(_request, _response) {
        var data = [];
        _request.on("error", onError);
        _request.on("data", function (_chunk) {
            data.push(_chunk);
        });
        _request.on("end", function () {
            console.log(JSON.parse(data.concat().toString()));
        });
    }
    function onError(_error) {
        console.log(_error);
    }
    /*function onData(_chunk: Buffer) {
        data.push(_chunk);
    }

    function onEnd(): void {
        console.log(JSON.parse(data.concat().toString()))
    }*/
})(server_example || (server_example = {}));
