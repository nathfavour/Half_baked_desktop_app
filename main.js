const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { dialog, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { ipcRenderer } = require("electron");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
// const appe = require('express');
// const appa = appe.appa;
const nodemailer = require('nodemailer');
const readline = require('readline');
const filePath = 'path/to/script.js';
const os = require('os');



// get the current platform
const platform = process.platform;
console.log(`Platform: ${platform}`);

// get the operating system release
const release = os.release();
console.log(`OS Release: ${release}`);

// get the operating system type
const type = os.type();
console.log(`OS Type: ${type}`);

// get the total system memory
const totalMemory = os.totalmem();
console.log(`Total Memory: ${totalMemory}`);

// get the free system memory
const freeMemory = os.freemem();
console.log(`Free Memory: ${freeMemory}`);


/* appa.use(bodyParser.urlencoded({ extended: true }));
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: '$2a$10$K4fQ5tH9eJwRvzZg6kCKzuC0BzwQyZ/1Hd8aS.9r7rOxZyTFLmE6u' // hashed password for 'password123'
  }
];
 */
/* appa.get('/', (req, res) => {
  res.send(`
    <form action="/login" method="POST">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  `);
});
 */
/* appa.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && bcrypt.compareSync(password, user.password)) {
    res.send('Login successful!');
  } else {
    res.send('Invalid email or password.');
  }
});
 */
/* app.listen(3000, () => console.log('Server started on port 3000'));
 */
let splash;
app.on('ready', () => {
  // create main browser window
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 800,
    height: 600,
	webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false // don't show the main window
  });

  // create a new `splash`-Window
  splash = new BrowserWindow({
    width: 610,
    height: 610,
    transparent: false,
	borderRadius: 100,
    frame: false,
    alwaysOnTop: true
  });
  splash.loadFile('burt_homepage.jpg');
  mainWindow.loadFile('index.html');

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  });
});


ipcMain.on("open-file-dialog", (event) => {
  dialog
    .showOpenDialog({
      properties: ["openFile"],
    })
    .then((result) => {
      if (!result.canceled) {
        const filePath = result.filePaths[0];
        const fileContent = fs.readFileSync(filePath, "utf-8");
        ipcRenderer.send("get-file", fileContent);
        event.reply("open-file", filePath, fileContent);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.on("save-file-dialog", (event, content) => {
  dialog
    .showSaveDialog({
      properties: ["createDirectory"],
    })
    .then((result) => {
        console.log('saved')
      if (!result.canceled) {
        console.log('saved result')
        const filePath = result.filePath;
        fs.writeFileSync(filePath, content, "utf-8");
        event.reply("save-file", filePath);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});