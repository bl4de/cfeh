<?php

/**
 * Created by PhpStorm.
 * User: rafal.janicki
 * Date: 2015-03-10
 * Time: 15:22
 */
interface StoreEngineInterface {
    public function loadData();

    public function saveData($data);
}