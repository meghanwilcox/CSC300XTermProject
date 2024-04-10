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
                        console.log('isAdmin', isAdminData);

                        try {
                            const userIDresponse = await fetch('http://localhost:3000/auth/get-userID', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({email: userData.email})
                            });
                            
                            if (userIDresponse.ok) {
                                
                                const { userID } = await userIDresponse.json(); // Extract the JSON data
                                alert('User id =' + userID);
                                if (isAdminData === true) {
                                    alert('User is an admin!');
                                    window.location.href = `admin.html?userID=${userID}`;
                                } else {
                                    alert('User is a shopper!');
                                    window.location.href = `index.html?userID=${userID}`;
                                }
                            } else {
                                console.error('Error getting userID:', response.statusText);
                                alert('An error occurred getting the userID');
                            }
                        } catch (error) {
                            console.error('Error getting userID:', error);
                            alert('An error occurred getting the userID');
                        }
                    }

                } catch (error) {
                    console.error('Error checking if user is an admin:', error);
                    alert('An error occurred while checking if a user is an admin');
                }
                
            } else {
                console.error('Error logging in:', error);
                alert('An error occured while trying to log user in.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    });    
});