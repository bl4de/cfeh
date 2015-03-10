/**
 * Created by rafal.janicki on 2015-03-10.
 */

function ClientApplication() {
    "use strict";

    var dataContainer = document.querySelector(".data"),
        receiveDataBtn = document.querySelector("#receive-data"),
        counterContainer = document.querySelector("#messages-counter-container"),
        messages = [],
        messagesCounter = 0,
        _self = this;

    this.init = function () {
        receiveDataBtn.addEventListener("click", _self.receiveData);
    };

    this.proceedMessage = function (message) {
        // we expected that valid message contains 8 elements
        message = message.split('#');
        if (message.length === 8) {
            messagesCounter++;
            messages.push(message);
        }
    };

    this.proceedData = function (data) {
        var __messages = data.split('\n');
        __messages = __messages.length > 0 ? __messages.slice(0, __messages.length) : __messages;
        if (__messages.length > 0) {
            __messages.map(_self.proceedMessage);
        }
        counterContainer.innerHTML = messagesCounter;

        console.log(messages);
    };

    this.receiveData = function () {
        jx.load('../server/server.php', _self.proceedData);
    };
};