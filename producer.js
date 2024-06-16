const amqp = require("amqplib");
const sendMessage = async () => {
    try {
        console.log("Connecting to RabbitMQ...");
        const connection = await amqp.connect("amqp://guest:guest@rabbitmq:5672");
        console.log("Connected!");

        const channel = await connection.createChannel();

        const queue = "my-queue";
        const message = "Hello, RabbitMQ!";

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(message));

        console.log(`Sent message: ${message}`);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.log("Error:", error);
        console.log("Retrying in 5 seconds...");
        setTimeout(sendMessage, 5000);
    }
};

sendMessage();