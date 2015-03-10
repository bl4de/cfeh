/**
 * Created by rafal.janicki on 2015-03-10.
 */

function ClientApplication() {
	"use strict";

	// variables declarations
	var dataContainer = document.querySelector(".data"),
		receiveDataBtn = document.querySelector("#receive-data"),
		stopReceiveDataBtn = document.querySelector("#stop-receive-data"),
		restoreReceiveDataBtn = document.querySelector("#restore-receive-data"),
		counterContainer = document.querySelector("#messages-counter-container"),
		messagesStatus = document.querySelector("#messages-status-container"),
		messages = [],


		messagesCounter = 0,
		cid = 0,    // interval ID
		_self = this;


	// methods
	this.init = function () {
		receiveDataBtn.addEventListener("click", _self.receiveData);
		receiveDataBtn.setAttribute("disabled", "disabled");
		restoreReceiveDataBtn.addEventListener("click", _self.receive);
		stopReceiveDataBtn.addEventListener("click", _self.stopReceive);

		this.setStatus('NO_NEW_MESSAGES');
	};

	this.proceedMessage = function (message) {
		message = message.split('#');
		// we expected that valid message contains 8 elements
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
			_self.setStatus('RECEIVED', __messages.length);
		} else {
			_self.setStatus('NO_NEW_MESSAGES');
		}
		counterContainer.innerHTML = messagesCounter;
	};

	this.receiveData = function () {
		jx.load('../server/server.php', _self.proceedData);
	};

	this.receive = function () {
		// activate/deactivate buttons
		stopReceiveDataBtn.removeAttribute("disabled");
		stopReceiveDataBtn.style.display = "block";
		restoreReceiveDataBtn.style.display = "none";
		receiveDataBtn.setAttribute("disabled", "disabled");

		cid = setInterval(_self.receiveData, 1000);
	};

	this.stopReceive = function () {
		if (cid > 0) {
			clearInterval(cid);

			// activate/deactivate buttons
			stopReceiveDataBtn.setAttribute("disabled", "disabled");
			stopReceiveDataBtn.style.display = "none";
			restoreReceiveDataBtn.style.display = "block";
			receiveDataBtn.removeAttribute("disabled");

			_self.setStatus('NO_NEW_MESSAGES');
		}
	};

	this.setStatus = function (status, counter) {
		var requestStatus = {
			NO_NEW_MESSAGES: "no new messages",
			RECEIVED: "received NUMBER messages"
		};

		switch (status) {
			case 'NO_NEW_MESSAGES' :
			{
				messagesStatus.innerHTML = requestStatus.NO_NEW_MESSAGES;
				messagesStatus.classList.remove("green");
				messagesStatus.classList.add("red");
			}
				break;

			case 'RECEIVED' :
			{
				messagesStatus.innerHTML = requestStatus.RECEIVED.replace("NUMBER", counter || 0);
				messagesStatus.classList.remove("red");
				messagesStatus.classList.add("green");
			}
				break;

			default :
			{
				_self.setStatus('NO_NEW_MESSAGES');
			}
				break;
		}

	};
};