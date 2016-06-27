'use strict';
const electron = require('electron');
const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let windows = {};

function onClosed(name) {
	windows[name] = null;
}

function createWindow(name, opts) {
	const win = new electron.BrowserWindow(opts || {
		width: 600,
		height: 400
	});

	win.loadURL(`file://${__dirname}/${name}.html`);
	win.on('closed', function() {
		onClosed(name)
	});

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!windows['index']) {
		windows['index'] = createWindow('index');
	}
});

app.on('ready', () => {
	windows['index'] = createWindow('index');
});
