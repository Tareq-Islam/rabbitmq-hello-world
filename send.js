const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err;
    connection.createChannel((err1, channel) => {
        if (err1) throw err1;
        const queue = 'hello';
        const msg = 'Hello World';

        channel.assertQueue(queue, {durable: false});

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("[x] Sent %s", msg);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 1000);
})