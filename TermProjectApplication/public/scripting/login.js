document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the data from the input form
    const loginForm = document.getElementById('login-form');
    const email = document.getElementById('email-input');
    const password = document.getElementById('password-input');

    // Add event listener to the form submission
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        const userData = {
            email: email.value,
            password: password.value
        };

        // Send a POST request to the server to authenticate the user
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('User logged in successfully!');

                // Send a separate request to check if the user is an admin
                try {
                    //check if the user is an admin
                    const isAdminResponse = await fetch('http://localhost:3000/auth/isAdmin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
                    
                    //if the user is an admin, redirect to admin main page
                    if (isAdminResponse.ok) {
                        const isAdminData = await isAdminResponse.json();
                        if(isAdminData.userType === 'admin'){
                            alert('User is an admin!');
                            window.location.href = 'admin.html';
                        }
                        
                    } else { //if user is not an admin redirect to main buyer page
                        window.location.href = 'index.html';
                    }
                } catch (error) {
                    console.error('Error checking if user is an admin:', error);
                    alert('An error occurred while checking if a user is an admin');
                }
                
            } else {
                const errorMessage = await response.text();
                console.error('Error logging in:', errorMessage);
                alert('Failed to login: ' + errorMessage);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    });    
});