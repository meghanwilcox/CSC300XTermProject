document.addEventListener('DOMContentLoaded', () => {
    const bulkUploadForm = document.getElementById('bulk-upload-form');

    bulkUploadForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData();
        formData.append('file', document.getElementById('file').files[0]); // Get the selected file

        try {
            const response = await fetch('/bulk-upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error uploading products');
            }

            const data = await response.json();
            console.log(data); // Handle response from backend
        } catch (error) {
            console.error('Error uploading products:', error);
            // Handle error, e.g., show error message to the user
        }
    });
});