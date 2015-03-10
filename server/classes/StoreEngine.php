<?php

/**
 * Created by PhpStorm.
 * User: rafal.janicki
 * Date: 2015-03-10
 * Time: 15:23
 */

// sample implementation of store engine - save to file
// other implementations: database
class StoreEngine implements StoreEngineInterface {
    private $data;

    public function loadData() {
        // get data from queue file
        $this->data = file_get_contents('messages.txt');

        // clear queue file
//        file_put_contents('messages.txt', NULL, LOCK_EX);
        return $this->data;
    }

    public function saveData($data) {
        // save message to queue file
        file_put_contents('messages.txt', $data, FILE_APPEND | LOCK_EX);
    }

    public function __construct() {

    }

}