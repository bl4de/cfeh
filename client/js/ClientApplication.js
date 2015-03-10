/**
 * Created by rafal.janicki on 2015-03-10.
 */

function ClientApplication() {
	"use strict";

	// variables declarations
	var receiveDataBtn = document.querySelector("#receive-data") || null,
		stopReceiveDataBtn = document.querySelector("#stop-receive-data") || null,
		restoreReceiveDataBtn = document.querySelector("#restore-receive-data") || null,
		counterContainer = document.querySelector("#messages-counter-container") || null,
		messagesStatus = document.querySelector("#messages-status-container") || null,
		messages = [],
		messagesCounter = 0,
		cid = 0,    // interval ID
		_self = this;


	// methods
	this.init = function (dataPresenter) {

		this.dataPresenter = dataPresenter || false;

		if (receiveDataBtn) {
			receiveDataBtn.addEventListener("click", _self.receiveData);
			receiveDataBtn.setAttribute("disabled", "disabled");
		}

		if (restoreReceiveDataBtn) {
			restoreReceiveDataBtn.addEventListener("click", _self.receive);
		}

		if (stopReceiveDataBtn) {
			stopReceiveDataBtn.addEventListener("click", _self.stopReceive);
		}

		this.setStatus('NO_NEW_MESSAGES');
	};

	this.proceedMessage = function (message) {
		message = message.split('#');
		// we expected that valid message contains 8 elements
		if (message.length === 8) {
			messagesCounter++;
			messages.push(message);
			return true;
		}
		return false;
	};

	this.proceedData = function (data) {
		var __messages = data.split('\n');

		__messages = __messages.length > 0 ? __messages.slice(0, __messages.length - 1) : __messages;

		if (__messages.length > 0) {
			__messages.map(_self.proceedMessage);
			if (__messages.length > 0 && __messages[0]) {
				_self.setStatus('RECEIVED', __messages.length);
			} else {
				_self.setStatus('NO_NEW_MESSAGES');
			}
		} else {
			_self.setStatus('NO_NEW_MESSAGES');
		}

		if (_self.dataPresenter) {
			_self.dataPresenter.prepareData(messages);
		}
		if (counterContainer) {
			counterContainer.innerHTML = messagesCounter;
		}
		return __messages;
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
		if (!messagesStatus) {
			return false;
		}

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