document.getElementById('toggle').addEventListener('click', () => {
    chrome.runtime.sendMessage({ command: "toggle" }, (response) => {
      chrome.storage.local.get('isActive', (data) => {
        document.getElementById('toggle').textContent = data.isActive ? 'Disable' : 'Enable';
      });
    });
  });
  
  // 현재 상태를 확인하고 버튼 텍스트를 업데이트합니다.
  chrome.storage.local.get('isActive', (data) => {
    const isActive = data.isActive;
    document.getElementById('toggle').textContent = isActive ? 'Disable' : 'Enable';
  });
  