/**
 * Created by xialei on 2017/6/5.
 */
import * as amqplib from 'amqplib';
import { Options } from "amqplib";
export default class Amqp {
    queueConfig: [string, Options.AssertQueue];
    publishConfig: [string, string];
    private connectionConfig;
    private connection;
    channel: amqplib.Channel;
    constructor(url: any, options?: any);
    /**
     * 订阅消费模式
     * @param callback
     * @returns {Promise<void>}
     */
    subscribe(callback: (e: Error | null, message: amqplib.Message, channel: amqplib.Channel) => void): Promise<void>;
    /**
     * 发布消息到队列
     * @param data
     * @returns {Promise<boolean>}
     */
    publish(data: any): Promise<boolean>;
    /**
     * 连接队列
     * @returns {Promise<void>}
     */
    connect(): Promise<void>;
}
