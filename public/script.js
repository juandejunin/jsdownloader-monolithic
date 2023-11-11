// script.js

// Function to add event listener to the download button
function addDownloadListener() {
    var downloadButton = document.getElementById('downloadButton');
    var loadingArrow = document.querySelector('.loading-arrow');
  
    // Function to handle the download button click
    function handleDownloadClick(event) {
      event.preventDefault()
      console.log('apretaste nomas'); // Prevent the form from being submitted
      loadingArrow.classList.add('rotate'); // Agregar la clase "rotate" para iniciar la animación
  
      setTimeout(function () {
        alert('Descarga completada'); // Simulate the download process
        // Puedes realizar la descarga real u otras acciones aquí
        loadingArrow.classList.remove('rotate'); // Eliminar la clase "rotate" para detener la animación
      }, 2000); // Esperar 2 segundos como ejemplo
    }
  
    // Add the event listener to the download button
    downloadButton.addEventListener('click', handleDownloadClick, false);
  }
  