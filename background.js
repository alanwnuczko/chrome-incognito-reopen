chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "reopen-incognito") return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) return;

  if (/^(chrome|chrome-extension|edge|about):/.test(tab.url)) {
    console.warn("Can't open this type of page in incognito:", tab.url);
    return;
  }

  await chrome.windows.create({
    url: tab.url,
    incognito: true
  });
});