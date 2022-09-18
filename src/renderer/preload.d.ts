import { Channels } from 'main/preload';
import { MoodleInstance } from '../../release/app/MoodleService/types';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
    MoodleService: {
      init: (
        instance: string,
        username: string,
        password: string
      ) => Promise<void>;
      getInstances: () => Promise<MoodleInstance[]>;
    };
  }
}

export {};
