<?php

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the following methods from any origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow the following headers from any origin
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Set content type to JSON
header("Content-Type: application/json");

// Check if the request method is either POST or GET
if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit();
    }

    // Check if both input fields are filled
    if (empty($email) || empty($message)) {
        echo "Both email and message are required";
        exit();
    }

    $to = "aaronfourie16@gmail.com";
    $subject = "Portfolio Contact Form Submission";
    $headers = "From: $email";

    mail($to, $subject, $message, $headers);

    echo "Email sent successfully!";

} else {
    // If the form is not submitted via POST or GET method, handle accordingly
    echo json_encode(array("error" => "Form submission method not allowed"));
}

?>


<?php
