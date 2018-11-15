import { EventEmitter } from "events";
import * as SocketIOClient from "socket.io-client";
import { Until } from "./until";

export class Client extends Until {
    private options: ClientOptions;
    private client: SocketIOClient.Socket;
    private emitter: EventEmitter;
    private eventsArray: string[];

    constructor(options?: ClientOptions) {
        super();
        if (options === undefined) {
            this.options = new ClientOptions();
        } else {
            this.options = options;
        }
        const uri: string = `${this.options.https ? "https" : "http"}://${this.options.host}:${this.options.port}`;
        this.client = SocketIOClient.default(uri);
        this.emitter = new EventEmitter();
        this.eventsArray = [];
    }

    public emit(event: string, ...args: any[]): this {
        this.client.emit(event, args);
        return this;
    }

    public on(event: string, listener: (...args: any[]) => void): this {
        this.emitter.on(event, listener);
        const exist: boolean = this.has(this.eventsArray, event);
        if (!exist) {
            this.client.on(event, (args: any) => {
                this.emitter.emit(event, args);
            });
            this.eventsArray.push(event);
        }
        return this;
    }
}

export class ClientOptions {
    public https: boolean = false;
    public host: string = "localhost";
    public port: number = 2030;
}
