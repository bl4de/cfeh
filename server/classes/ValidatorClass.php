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

        return true;
    }
}