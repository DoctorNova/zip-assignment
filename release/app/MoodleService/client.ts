import { net } from 'electron';

interface InitOptions {
  wwwroot: string;
  username: string;
  password: string;
  token?: string;
  service?: string;
}

export class Client {
  public wwwroot: string;

  public service: string = 'moodle_mobile_app';

  public token: string | null = null;

  public strictSSL = true;

  private constructor(options: InitOptions) {
    this.wwwroot = options.wwwroot;

    if (options.token) {
      this.token = options.token;
    }

    if (options.service) {
      this.service = options.service;
    }
  }

  private static authenticate(
    client: Client,
    username: string,
    password: string
  ): Promise<Client> {
    return new Promise((resolve, reject) => {
      const request = net.request(
        `${client.wwwroot}/login/token.php?service=${client.service}&username=${username}&password=${password}`
      );
      request.on('response', (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Moodle responded with ${response.statusCode}`));
        }

        const data = new Array<Buffer>();

        response.on('data', (chunk) => {
          data.push(chunk);
        });

        response.on('error', (error: string) => {
          reject(error);
        });

        response.on('end', () => {
          const userInfos = JSON.parse(Buffer.concat(data).toString());
          if (userInfos.token) {
            client.token = userInfos.token;
            resolve(client);
          } else if (userInfos.error) {
            reject(new Error(userInfos.error));
          } else {
            reject(
              new Error(
                'Moodle authentication failed: Service unavailable. Pease try again later.'
              )
            );
          }
        });
      });
      request.on('error', (error) => {
        reject(error);
      });
      request.setHeader('Content-Type', 'application/json');
      request.end();
    });
  }

  /**
   * Factory method promising an authenticated client instance.
   *
   * @method
   * @returns {Promise}
   */
  public static createClient(options: InitOptions): Promise<Client> {
    const client = new Client(options);

    if (client.token !== null) {
      // If the token was explicitly provided, there is nothing to wait for - return
      // the promised client.
      return Promise.resolve(client);
    }
    // Otherwise return the pending promise of the authenticated client.
    if (!('username' in options)) {
      return Promise.reject(
        new Error('coding error: no username (or token) provided')
      );
    }
    if (!('password' in options)) {
      return Promise.reject(
        new Error('coding error: no password (or token) provided')
      );
    }

    return this.authenticate(client, options.username, options.password);
  }
}
