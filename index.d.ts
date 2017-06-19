/**
 * Created by xialei on 2017/6/5.
 */
import * as amqplib from 'amqplib';
export default class Amqp {
    queueConfig: [string, any];
    publishConfig: [string, string];
    private connectionConfig;
    private connection;
    private channel;
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
    connect(): Promise<void>;
}
