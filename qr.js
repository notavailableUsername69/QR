function decodeQRCode() {
    var input = document.getElementById("qr-image");
  
    if (!input.files || !input.files[0]) {
      alert("Please select an image.");
      return;
    }
  
    var file = input.files[0];
    var reader = new FileReader();
  
    reader.onload = function(e) {
      var img = document.createElement("img");
      img.onload = function() {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);
        var imageData = context.getImageData(0, 0, img.width, img.height);
       
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
  
        if (code) {
          var decodedData = "Decoded data: " + code.data;
          document.getElementById("result").textContent = decodedData;
  
          // Send the decoded data to the source
          sendDataToSource(decodedData);
        } else {
          document.getElementById("result").textContent = "No QR code found.";
        }
      };
      img.src = e.target.result;
    };
  
    reader.onerror = function(e) {
      console.error("Error occurred while reading the image:", e);
    };
  
    reader.readAsDataURL(file);
  }
  
  function sendDataToSource(data) {
    // Make an HTTP request to send the decoded data to the source
    // Replace 'YOUR_ENDPOINT_URL' with the actual endpoint URL where you want to send the data
    var endpointURL = 'YOUR_ENDPOINT_URL';
   
    // Example of sending data using the Fetch API
    fetch(endpointURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: data })
    })
    .then(function(response) {
      if (response.ok) {
        console.log("Data sent successfully!");
      } else {
        console.error("Error occurred while sending data:", response.statusText);
      }
    })
    .catch(function(error) {
      console.error("Error occurred while sending data:", error);
    });
  }