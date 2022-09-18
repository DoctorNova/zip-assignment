import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { MoodleInstance } from '../../release/app/MoodleService/types';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('MoodleService', {
  init: (
    instance: string,
    username: string,
    password: string
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const listener = (_event: unknown, arg: Record<string, string>) => {
        if (arg.error) {
          reject(arg.error);
        } else {
          resolve();
        }
      };

      ipcRenderer.once('moodleClient', listener);
      ipcRenderer.invoke(
        'moodle.service.createClient',
        instance,
        username,
        password
      );
      setTimeout(() => {
        reject(new Error('handler timed out'));
        ipcRenderer.off('moodleClient', listener);
      }, 50000);
    });
  },
  getInstances: (): Promise<MoodleInstance[]> => {
    return new Promise((resolve, reject) => {
      const listener = (
        _e: IpcRendererEvent,
        moodleInstances: MoodleInstance[]
      ) => {
        resolve(moodleInstances);
      };

      ipcRenderer.once('moodleInstances', listener);
      ipcRenderer.invoke('moodle.service.getInstances');
      setTimeout(() => {
        reject();
        ipcRenderer.off('moodleInstances', listener);
      }, 5000);
    });
  },
});

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
