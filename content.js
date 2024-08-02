chrome.storage.local.get('isActive', (data) => {
    const isActive = data.isActive;
  
    if (isActive) {
      chrome.storage.local.get('targetImages', (data) => {
        const targetImages = data.targetImages || [];
        
        document.querySelectorAll('img').forEach((img) => {
          if (targetImages.includes(img.src)) {
            img.src = chrome.runtime.getURL('images/namuwiki.png');
          }
        });
      });
    }
  });
  