const { ipcRenderer } = require("electron");

const editor = document.getElementById("editor");
const openBtn = document.getElementById("openBtn");
const saveBtn = document.getElementById("saveBtn");

openBtn.addEventListener("click", () => {
  ipcRenderer.send("open-file-dialog");
});

saveBtn.addEventListener("click", () => {
  const content = editor.value;
  ipcRenderer.send("save-file-dialog", content);
});
ipcRenderer.on("open-file", (event, filePath, fileContent) => {
  editor.value = fileContent;

});