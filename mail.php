<?php

$name = $_POST["name"];
$phone = $_POST["tel"];

$from = '<blanchard@blanchard.ru>';
$to = 'Admin <matokmakov@mail.ru>';
$subject = 'Заявка на обратный звонок';
$message = 'Здравствуйте! Пожалуйста, свяжитесь со мной по указанному номеру.' . $phone;
$headers = 'From: ' . $name . $from;

if (!mail($to, $subject, $message, $headers))
{
    echo "Error.";
}
else
{
    echo "Message sent.";
}
?>

