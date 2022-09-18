import { Client } from './client';
import { getInstances } from './getInstances';

const moodleUrl = 'https://distance.digipen.edu';

let client: Client;

export const MoodleService = {
  createClient: (instance: string, username: string, password: string) => {
    const pathToInstance = instance.startsWith('/') ? instance : `/${instance}`;

    return Client.createClient({
      wwwroot: moodleUrl + pathToInstance,
      username,
      password,
    }).then((connectedClient) => {
      client = connectedClient;
      return client;
    });
  },
  getInstances: () => getInstances(moodleUrl),
};
