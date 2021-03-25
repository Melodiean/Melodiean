<!-- <?php print $_POST['guest_email']; ?> -->

<!-- Thanks for your message! <?php print $_POST['guest_message'] ?> -->

<?php
error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");

$name = $_POST["guest_name"];
$email = $_POST["guest_email"];
$subject = $_POST["mail_title"];
$content = $_POST["guest_message"];

$to = "adieuxtah@gmail.com";

$headers = array("From: adieuxtah@gmail.com",
    "Reply-To: adieuxtah@gmail.com",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=ISO-8859-1",
    "X-Priority: 1",
    "X-Mailer: PHP/" . PHP_VERSION
);
// $subject = "Email from my website";
// $body = "the user typed in ...";
$status = mail('adieuxtah@gmail.com', $subject,$content,$headers);

echo $status;


if($status)
{
    echo '<p>Your mail has been sent!</p>';
} else {
    echo '<p>Something went wrong. Please try again!</p>';
}
echo $status;
?>