<?php
/**
 * Created by PhpStorm.
 * User: rafal.janicki
 * Date: 2015-03-10
 * Time: 14:37
 */
// Validator - performs message validation
class ValidatorClass implements ValidatorInterface {

	public function __construct() {

	}

	public function validateMessage($message) {
		$valid = true;
		// currency symbols should be 3-signs length
		if (strlen($message->currencyFrom) !== 3 || strlen($message->currencyTo) !== 3) {
			$valid = false;
		}

		// amount buy, sell and rate should be numeric
		if (!is_numeric($message->amountSell) || !is_numeric($message->amountBuy) || !is_numeric
			($message->rate)
		) {
			$valid = false;
		}

		// country symbol should be 3-signs length
		if (strlen($message->originatingCountry) !== 2) {
			$valid = false;
		}
		return $valid;
	}
}