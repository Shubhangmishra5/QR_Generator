document.getElementById("generate-btn").addEventListener("click", function() {
    const inputText = document.getElementById("qr-input").value;
 
    if (inputText) {
        const qrCodeDiv = document.getElementById("qr-code");
        const qrPreviewDiv = document.getElementById("qr-preview");
        qrCodeDiv.innerHTML = ''; // Clear previous QR code
        qrPreviewDiv.innerHTML = ''; // Clear previous preview
        
        const qrCodeImage = document.createElement("img");
        const qrColor = document.getElementById("qr-color").value;
 
        // Using the goqr.me API to generate QR code with custom color
        qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(inputText)}&size=200x200&color=${hexToRgb(qrColor)}&bgcolor=ffffff`; // Black QR on white background
 
        qrCodeDiv.appendChild(qrCodeImage);
        
        // Show live preview
        const previewImage = document.createElement("img");
        previewImage.src = qrCodeImage.src; // Same as generated QR code
        qrPreviewDiv.appendChild(previewImage);
 
        // Set up download link
        const downloadBtn = document.getElementById("download-btn");
        downloadBtn.href = qrCodeImage.src; // Set download link to QR code image
        downloadBtn.style.display = "inline"; // Show download button
 
        // Set up share button functionality
        const shareBtn = document.getElementById("share-btn");
        shareBtn.onclick = function() {
            if (navigator.share) { // Check if Web Share API is supported
                navigator.share({
                    title : 'Check out this QR Code!',
                    text : 'Scan this QR Code!',
                    url : qrCodeImage.src,
                })
                .then(() => console.log('Share successful'))
                .catch((error) => console.log('Error sharing:', error));
            } else {
                alert('Sharing not supported in this browser.');
            }
        };
        
    } else {
        alert("Please enter a URL or text.");
    }
 });
 
 // Function to convert hex color to RGB for API usage
 function hexToRgb(hex) {
    let r = parseInt(hex.slice(1,3),16);
    let g = parseInt(hex.slice(3,5),16);
    let b = parseInt(hex.slice(5,7),16);
    
    return `${r},${g},${b}`;
 }