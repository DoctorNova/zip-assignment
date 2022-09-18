import { BrowserWindow } from 'electron';
import { MoodleService } from '../../release/app/MoodleService';

export function handlers(ipcMain: Electron.IpcMain, mainWindow: BrowserWindow) {
  ipcMain.handle('moodle.service.getInstances', () => {
    MoodleService.getInstances()
      .then((instances) => {
        mainWindow.webContents.send('moodleInstances', instances);
        return instances;
      })
      .catch((error) => {
        console.error(error);
      });
  });

  ipcMain.handle(
    'moodle.service.createClient',
    (_event, instance: string, username: string, password: string) => {
      MoodleService.createClient(instance, username, password)
        .then((client) => {
          mainWindow.webContents.send('moodleClient', {
            error: null,
          });
          return client;
        })
        .catch((error) => {
          mainWindow.webContents.send('moodleClient', {
            error,
          });
        });
    }
  );
}
