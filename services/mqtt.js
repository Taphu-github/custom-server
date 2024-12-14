const mqtt = require('mqtt');

const {connectToMongoDB} = require('../lib/mongodb');
const { format_time, format_date } = require('../utils/format_time');  // Adjust path as necessary
const Animal = require("../models/detected_animal");
const device = require("../models/device");


var options = {
    host: '34773dcfbaf24a4bba66e5a333c2df9a.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'ads@rpi',
    password: 'Ads12345678'
}


async function initMqttClient(){
    // Create the MQTT client with appropriate typing
    const client= mqtt.connect(options);
    await connectToMongoDB();

    

    // Event listener for 'connect'
    client.on('connect', () => {
    console.log('Connected to mqtt');
    });

    // Event listener for 'error'
    client.on('error', (error) => {
    console.error('Error:', error.message);
    });

    // Event listener for 'message'
    client.on('message', async(topic, message) => {
        // Process the received message based on the topic
        // if (topic === 'animal') {
        const lastMessage = message.toString();
            
        const pay_load = lastMessage.split("####");
        const formatted_date= format_date(pay_load[3]);
        const formatted_time= format_time(pay_load[3]);

        const new_detected_animal = new Animal({
            a_c_id: pay_load[0],
            d_id: pay_load[1],
            enroach_time: formatted_time,
            enroach_date:  formatted_date,
            animal_count: parseInt(pay_load[2])
        });

        new_detected_animal.save().then().catch(err=> console.log(err));

        console.log('Received message:', lastMessage);

        // } else if (topic === 'animal_description') {
        //     console.log('Processing animal description...');
        //     // Additional logic can be added here
        // }
    });
    
    // Subscribe to the 'animal' topic
    var devices = await device.find();
    devices.map((device)=>{
        client.subscribe(device.d_id, (err) => {
            console.log(device.d_id)
            if (err) {
                console.error('Subscription error:', err.message);
            } else {
                console.log('Subscribed to topic: ',device.d_id);
            }
            });
    })

    // client.subscribe('animal', (err) => {
    // if (err) {
    //     console.error('Subscription error:', err.message);
    // } else {
    //     console.log('Subscribed to topic: animal');
    // }
    // });

    // Graceful shutdown handling
    process.on('exit', () => {
    client.end(() => {
        console.log('MQTT client disconnected gracefully');
    });
    });

  }

  module.exports = { initMqttClient };
