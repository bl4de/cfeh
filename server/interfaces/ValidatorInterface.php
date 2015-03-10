<?php
/**
 * Created by PhpStorm.
 * User: rafal.janicki
 * Date: 2015-03-10
 * Time: 15:04
 */

// interface implemented by all types of validators
interface ValidatorInterface {
    public function validateMessage($message);
}