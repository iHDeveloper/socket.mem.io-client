import { EventEmitter } from "events";
import * as SocketIOClient from "socket.io-client";

export class Client {
    private options: ClientOptions;
    private client: SocketIOClient.Socket;
    private emitter: EventEmitter;

    constructor(options?: ClientOptions) {
        if (options === undefined) {
            this.options = new ClientOptions();
        } else {
            this.options = options;
        }
        const uri: string = `${this.options.https ? "https" : "http"}://${this.options.host}:${this.options.port}`;
        this.client = SocketIOClient.default(uri);
    }

}

export class ClientOptions {
    public https: boolean = false;
    public host: string = "localhost";
    public port: number = 2030;
}
