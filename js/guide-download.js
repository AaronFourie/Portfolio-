document.addEventListener('DOMContentLoaded', async function () {
    const guideContainer = document.getElementById('guide-container');

    // Replace these links with the actual shareable links of your Dropbox PDF files
    const dropboxLink1 = 'https://www.dropbox.com/scl/fi/licoqb4kotd55htifhzae/ASPDotNet_Core_Web_App_-MVC-_using_Individual_Accounts.pdf?rlkey=llv7vmfj6wjaigso6r4zy3muj&dl=0';
    const dropboxLink2 = 'https://www.dropbox.com/scl/fi/zevndcj7gflo92gzgwr6p/WPF_App_with_SQL_Database.pdf?rlkey=en0h6jvqfib0qjrwgdnriogv3&dl=0';

    function createIframeElement(pdfUrl, fileName) {
        const iframeElement = document.createElement('iframe');
        iframeElement.src = pdfUrl;
        iframeElement.width = '57%';
        iframeElement.height = '650';

        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = fileName;
        guideContainer.appendChild(downloadLink);
    }

    try {
        // Display the first PDF
        createIframeElement(dropboxLink1, 'WPF_App_with_SQL_Database.pdf');

        // Display the second PDF
        createIframeElement(dropboxLink2, 'ASPDotNet_Core_Web_App_MVC_using_Individual_Accounts.pdf');
    } catch (error) {
        // Handle the error and display a message
        const errorMessage = document.createElement('p');
        errorMessage.textContent = `Error loading PDF: ${error.message}`;
        guideContainer.appendChild(errorMessage);
    }
});