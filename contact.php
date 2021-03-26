<?php
// error_reporting(-1);
// ini_set('display_errors', 'On');
// set_error_handler("var_dump");

if (isset($_POST["guest_email"])) {

    $name = $_POST["guest_name"];
    $email = $_POST["guest_email"];
    $subject = $_POST["mail_title"];
    $content = $_POST["guest_message"];


    $headers  = 'From: ' . $email . "\n";
    $headers .= 'Reply-to: ' . $email . "\n";

    mail('adieuxtah@gmail.com', $subject, $content, $headers);

    echo '<p>Your mail has been sent!</p>';
} else {
    echo '<p>Something went wrong. Please try again!</p>';
}
