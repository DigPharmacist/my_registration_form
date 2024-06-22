// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the form element
    const form = document.querySelector('form');

    // Function to validate form inputs
    function validateForm(event) {
        // Prevent the form from submitting
        event.preventDefault();

        // Fetch input values
        const name = document.getElementById('Name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('Con_password').value.trim();
        const dob = document.getElementById('DOB').value.trim();
        const phoneNo = document.getElementById('Number').value.trim();
        const genderMale = document.getElementById('Male-gen').checked;
        const genderFemale = document.getElementById('Female-gen').checked;
        const termsAccepted = document.getElementById('terms-and-conditions').checked;

        // Validation logic
        if (name === '') {
            alert('Please enter your name');
            return;
        }

        if (email === '') {
            alert('Please enter your email');
            return;
        }

        // Validate email format using a simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (password === '') {
            alert('Please enter a password');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (dob === '') {
            alert('Please enter your date of birth');
            return;
        }

        // Validate phone number length
        if (phoneNo.length !== 10) {
            alert('Please enter a 10-digit phone number');
            return;
        }

        if (!genderMale && !genderFemale) {
            alert('Please select your gender');
            return;
        }

        if (!termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }

        // Save user info to localStorage
        const userInfo = {
            name: name,
            email: email,
            dob: dob,
            phoneNo: phoneNo,
            gender: genderMale ? 'Male' : 'Female'
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // Reset the form
        form.reset();

        // Show success message or any further action (here we just alert)
        alert('Form submitted successfully!');

        // You can optionally redirect or perform other actions after successful submission
    }

    // Add submit event listener to the form
    form.addEventListener('submit', validateForm);

    // Function to reset the form
    function resetForm(event) {
        event.preventDefault();
        form.reset(); // Reset the form
    }

    // Add reset event listener to the reset button
    const resetButton = document.querySelector('input[type="reset"]');
    resetButton.addEventListener('click', resetForm);

    // Function to show the form with saved data from localStorage
    function showFormWithData() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo) {
            document.getElementById('Name').value = userInfo.name;
            document.getElementById('email').value = userInfo.email;
            // Assuming you want to populate other fields as well (dob, phoneNo, gender)
            document.getElementById('DOB').value = userInfo.dob;
            document.getElementById('Number').value = userInfo.phoneNo;
            if (userInfo.gender === 'Male') {
                document.getElementById('Male-gen').checked = true;
            } else {
                document.getElementById('Female-gen').checked = true;
            }
        }
    }

    // Call the function to populate form fields if user info exists in localStorage
    showFormWithData();
});
