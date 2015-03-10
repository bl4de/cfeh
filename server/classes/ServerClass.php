<?php
/**
 * Created by PhpStorm.
 * User: rafal.janicki
 * Date: 2015-03-10
 * Time: 14:33
 */
// this is the main Server class
class ServerClass {

    // message validator object
    private $validator;

    // message formatter object
    private $formatter;

    // store engine object
    private $storeEngine;

    // as we are not exposed some interface outside,
    // a few of methods are declared as protected
    protected function processMessage($message) {

        if (true === $this->validator->validateMessage($message)) {
            // message is ok, we can format it and store into store engine
            $message = $this->formatter->formatMessage($message);
            $this->storeEngine->saveData($message);
        }
    }

    public function sendData() {
        $data = trim($this->storeEngine->loadData());
        //send data to client
        header("Content-type: application/text");
        echo $data;
    }

    // some dependency injection here:
    public function  __construct(ValidatorInterface $validator, FormatterInterface $formatter, StoreEngineInterface $storeEngine) {
        $this->validator = $validator;
        $this->formatter = $formatter;
        $this->storeEngine = $storeEngine;
    }

    public function listen() {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'POST' : {
                $message = json_decode(file_get_contents('php://input'));
                $this->processMessage($message);
            };
                break;

            case 'GET' : {
                $this->sendData();
            };
                break;

            default:
                break;
        }
    }
}
