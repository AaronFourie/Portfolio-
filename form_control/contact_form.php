<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
    $message = trim($_POST["message"]);

    // Validate email
    if (!$email) {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid email format"));
        exit();
    }

    // Check if both input fields are filled
    if (empty($message)) {
        http_response_code(400);
        echo json_encode(array("error" => "Message is required"));
        exit();
    }

    // Set the recipient email address
    $to = "aaronfourie16@gmail.com";

    // Set email subject
    $subject = "Portfolio Contact Form Submission";

    // Set additional headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Send email
    $success = mail($to, $subject, $message, $headers);

    if ($success) {
        http_response_code(200);
        echo json_encode(array("message" => "Email sent successfully!"));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Failed to send email"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("error" => "Method Not Allowed"));
}
?>