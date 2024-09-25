window.onload = function() {
    const popup = document.getElementById('popup');
    
    setTimeout(() => {
      popup.classList.remove('hidden');
      popup.classList.add('visible');
    }, 100);
  
    setTimeout(() => {
      popup.classList.remove('visible');
      popup.classList.add('hidden');
    }, 5000);
  };
  