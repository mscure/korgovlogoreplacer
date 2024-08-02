chrome.runtime.onInstalled.addListener(() => {
    // JSON 파일을 로드하여 storage에 저장합니다.
    fetch(chrome.runtime.getURL('data/imageMappings.json'))
      .then(response => response.json())
      .then(data => {
        chrome.storage.local.set({ targetImages: data.targetImages });
      })
      .catch(error => console.error('Error loading imageMappings.json:', error));
  
    // 기본 상태를 비활성화로 설정
    chrome.storage.local.set({ isActive: false });
  });
  
  // 메시지를 수신하여 기능의 활성화 상태를 전환합니다.
  chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "toggle") {
      chrome.storage.local.get('isActive', (data) => {
        const newStatus = !data.isActive;
        chrome.storage.local.set({ isActive: newStatus });
        // 모든 탭에서 content.js 실행
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: () => {
                chrome.storage.local.get('isActive', (data) => {
                  if (data.isActive) {
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
              }
            });
          });
        });
      });
    }
  });
  