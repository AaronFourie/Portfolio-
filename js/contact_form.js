document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Use your Email.js Public Key (treat it as the User ID)
    emailjs.init("ICwHI_FDNQA9LlZ_n");

    var templateParams = {
        email: email,
        from_name:  email, // Replace with the actual sender's name
        message: message
    };

    // Use your Email.js Service ID and Template ID
    emailjs.send("service_pu3e1dj", "template_hixc8aa", templateParams)
        .then(function(response) {
            alert('Email sent successfully!');
        }, function(error) {
            console.error('Error:', error);
            alert('Failed to send email');
        });
});