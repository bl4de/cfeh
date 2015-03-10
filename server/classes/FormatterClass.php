<?php
/**
 * Created by PhpStorm.
 * User: rafal.janicki
 * Date: 2015-03-10
 * Time: 14:41
 */
// provides methods for formatting messages for store engine
class FormatterClass implements FormatterInterface {

    private $separator = "#";

    public function __construct() {

    }

    public function formatMessage($message) {
        $formattedMessage = $message->userId . $this->separator . $message->currencyFrom . $this->separator
            . $message->currencyTo . $this->separator . $message->amountSell . $this->separator
            . $message->amountBuy . $this->separator
            . $message->rate . $this->separator . $message->timePlaced
            . $this->separator . $message->originatingCountry . PHP_EOL;

        return $formattedMessage;
    }
}