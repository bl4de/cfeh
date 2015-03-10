/**
 * Created by bl4de on 10.03.15.
 */

// DataPresenter object constructor fn()

function DataPresenter() {
	var _self = this,
		dataContainer = document.querySelector(".data"),
		pairTemplate = '<div><strong>PAIR</strong> : total sell: TOTAL_SELL total buy: TOTAL_BUY ' +
			'avreage rate: AVG_RATE transactions: TRANSACTIONS</div>',
		countryTemplate = '<div>Originating country: <strong>COUNTRY</strong> transactions: TRANSACTIONS</div>',
		pairs = {},
		countries = {};

	this.processMessage = function (message) {
		var pairKey = message[1] + "/" + message[2],
			country = message[7];

		if (pairs.hasOwnProperty(pairKey)) {
			pairs[pairKey].sellTotal += parseFloat(message[3]);
			pairs[pairKey].buyTotal += parseFloat(message[4]);
			pairs[pairKey].avgRate = (parseFloat(pairs[pairKey].avgRate) + parseFloat(message[5])) / parseInt(pairs[pairKey].transactions, 10);
			pairs[pairKey].transactions += 1;
		} else {
			pairs[pairKey] = {
				transactions: 1,
				sellTotal: parseFloat(message[3]),
				buyTotal: parseFloat(message[4]),
				avgRate: parseFloat(message[5])
			};
		}

		if (countries.hasOwnProperty(country)) {
			countries[country] += 1;
		} else {
			countries[country] = 1
		}
	};

	this.displayData = function (pairs, countries) {
		dataContainer.innerHTML = "";

		var element = document.createDocumentFragment();
		for (var pair in pairs) {
			var pairEl = document.createElement('div');
			pairEl.innerHTML = pairTemplate
				.replace('PAIR', pair)
				.replace('TOTAL_SELL', pairs[pair].sellTotal)
				.replace('TOTAL_BUY', pairs[pair].buyTotal)
				.replace('AVG_RATE', pairs[pair].avgRate)
				.replace('TRANSACTIONS', pairs[pair].transactions);
			element.appendChild(pairEl);
		}

		for (var country in countries) {
			var countryEl = document.createElement('div');
			countryEl.innerHTML = countryTemplate
				.replace('COUNTRY', country)
				.replace('TRANSACTIONS', countries[country]);
			element.appendChild(countryEl);
		}

		dataContainer.appendChild(element);
	};

	this.prepareData = function (messages) {
		pairs = {};
		countries = {};

		// analyze data
		messages.map(_self.processMessage);

		// refresh view
		this.displayData(pairs, countries);
	};
}