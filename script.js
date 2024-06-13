$(document).ready(function() {
    $('#sendSMSForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        const phoneNumber = $('#phoneNumber').val().trim();
        const message = $('#message').val().trim();
        const token = '110440851401715914300be5a61a4674964de3238e502bb8545d7';

        const url = 'http://api.greenweb.com.bd/g_api.php';
        const queryParams = {
            json: 1,
            to: phoneNumber,
            message: message,
            token: token
        };

        $.ajax({
            url: url,
            method: 'GET',
            data: queryParams,
            dataType: 'json', // Expect JSON response
            success: function(response) {
                displayResponse(response);
                displayResponse("Message Sent Successfully");
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                displayResponse({ error: 'Failed to send SMS' });
            }
        });
    });
});

function displayResponse(data) {
    const responseContainer = $('#response-container');
    responseContainer.empty(); // Clear previous content
    
    if (data.error) {
        responseContainer.append(`<p class="text-danger">${data.error}</p>`);
    } else {
        responseContainer.append(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
    }
}
