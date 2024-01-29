<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
    // If the form is not submitted via POST method, redirect or handle accordingly
    echo "Form submission method not allowed";
}

?>