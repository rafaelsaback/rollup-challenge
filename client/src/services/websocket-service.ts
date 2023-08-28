import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:9001';

export class WebsocketService {
  private static _instance?: WebsocketService;
  private _socket;
  private constructor() {
    this._socket = io(SOCKET_URL);
  }

  public static get instance(): WebsocketService {
    if (!this._instance) {
      this._instance = new WebsocketService();
    }
    return this._instance;
  }

  public static init() {
    this._instance = new WebsocketService();
  }

  public send(event: string, payload: any, callback: (success: boolean) => void) {
    this._socket.emit(event, payload, callback);
  }

  public subscribe(event: string, callback: (data: any) => void) {
    this._socket.on(event, callback);
  }

  public unsubscribe(event: string) {
    this._socket.off(event);
  }
}
