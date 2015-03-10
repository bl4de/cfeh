/**
 * Created by rafal.janicki on 2015-03-10.
 */


function ClientApplication() {
    "use strict";

    var dataContainer = document.querySelector(".data"),
        messages = [],
        _self = this;

    this.proceedMessage = function (message) {
        messages.push(message.split('#'));
    };

    this.proceedData = function (data) {
        var __messages = data.split('\n');
        if (__messages.length > 0) {
            __messages.map(_self.proceedMessage);
        }

        console.log(messages);
    };

    this.receiveData = function () {
        jx.load('../server/server.php', this.proceedData);
    };
};

var Application = new ClientApplication();
Application.receiveData();