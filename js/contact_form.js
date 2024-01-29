document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Validate email
    if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
    }

    // Check if both input fields are filled
    if (!email || !message) {
        alert('Both email and message are required');
        return;
    }

    // Send data to serverless function using fetch API
    fetch('./form_control/contact_form.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'email=' + encodeURIComponent(email) + '&message=' + encodeURIComponent(message),
    })
    .then(response => {
        if (response.ok) {
            alert('Email sent successfully!');
        } else {
            throw new Error('Failed to send email');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function validateEmail(email) {
    // Simple email validation, you may want to use a more robust method
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}