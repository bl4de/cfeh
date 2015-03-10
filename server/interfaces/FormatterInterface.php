<?php

/**
 * Created by PhpStorm.
 * User: rafal.janicki
 * Date: 2015-03-10
 * Time: 14:43
 */

// defines interface for message formatters
interface FormatterInterface {
    public function formatMessage($message);
}