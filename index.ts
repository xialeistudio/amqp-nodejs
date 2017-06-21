/**
 * Created by xialei on 2017/6/5.
 */
import * as amqplib from 'amqplib';
import {Options} from "amqplib";

const debug = require('debug')('@xialeistudio/amqp');
export default class Amqp {
    public queueConfig: [string, Options.AssertQueue];
    public publishConfig: [string, string];
    private connectionConfig: [string, any];
    private connection: amqplib.Connection;
    public channel: amqplib.Channel;

    constructor(url: any, options?: any) {
        this.connectionConfig = [url, options];
    }

    /**
     * 订阅消费模式
     * @param callback
     * @returns {Promise<void>}
     */
    public async subscribe(callback: (e: Error | null, message: amqplib.Message, channel: amqplib.Channel) => void) {
        if (!this.queueConfig) {
            throw new Error('queueConfig未配置');
        }
        if (!this.connection && !this.channel) {
            await this.connect();
        }
        await this.channel.assertQueue(this.queueConfig[0], this.queueConfig[1]);
        await this.channel.consume(this.queueConfig[0], (msg) => {
            callback(null, msg, this.channel);
        });
    }

    /**
     * 发布消息到队列
     * @param data
     * @returns {Promise<boolean>}
     */
    public async publish(data: any) {
        if (!this.publishConfig) {
            throw new Error('publishConfig未配置');
        }
        if (!this.connection && !this.channel) {
            await this.connect();
        }
        const buffer = Buffer.isBuffer(data) ? data : new Buffer(data);
        return this.channel.publish(this.publishConfig[0], this.publishConfig[1], buffer);
    }

    /**
     * 连接队列
     * @returns {Promise<void>}
     */
    public async connect() {
        this.connection = await amqplib.connect(this.connectionConfig[0], this.connectionConfig[1]);
        this.channel = await this.connection.createChannel();
    }
}
