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
        $this->data = file_get_contents('messages.txt');
        file_put_contents('messages.txt', NULL);
        return $this->data;
    }

    public function saveData($data) {
        file_put_contents('messages.txt', $data, FILE_APPEND | LOCK_EX);
    }

    public function __construct() {

    }

}