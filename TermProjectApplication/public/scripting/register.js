document.addEventListener('DOMContentLoaded', () => {
    //retrive data from the input forms
    const registerForm = document.getElementById('register-form');
    // const userNameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    
    // Add event listener to the form submission
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        // // Regular expression to match UNCG email format
        // const uncgEmailRegex = /^[^\s@]+@uncg\.edu$/i;

        // // Check if the email matches the UNCG email format
        // if (!uncgEmailRegex.test(emailInput.value)) {
        //     return;
        // }

       // Get the current date
        const currentDate = new Date();

        // Format the date in YYYY-MM-DD format
        const formattedDate = currentDate.toISOString().split('T')[0];

        // Formulate the JSON object
        const userData = {
            dateCreated: formattedDate,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            userType: "shopper" // Assuming default value is shopper
        };
    
        try {
            // Send POST request to the registration endpoint
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (response.ok) {
                alert('User registered successfully!');
                // Redirect to some page after successful registration if needed
                window.location.href = 'index.html';
            } else {
                const errorMessage = await response.text();
                alert(`Failed to register user: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user. Please try again later.');
        }
    });
    
});

