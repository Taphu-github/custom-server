const {connectToMongoDB} = require('../lib/mongodb');
// const User = require("../models/user");
const Device_owner = require("../models/device_owner");
// import device_owner from "@/models/device_owner";
// import user from "@/models/user";
const FCMToken = require("../models/fcm_token.cjs");


var admin = require("firebase-admin");
var serviceAccount = require("../aidsv2-firebase-adminsdk-jr5yw-2e521e6e41.json");
// const device = require('../models/device');


async function notify_user(selected_topic, animal_name){

    let device_owner_lists= await Device_owner.find({"d_id":selected_topic})
    let device_owner_id_list=[]
    device_owner_lists.map((d_owner)=>{
        device_owner_id_list.push(d_owner.user_id)
    })

    let fcm_device_owners_list=[]
    for(let i =0; i< device_owner_id_list.length; i++){

        let fcm_device_owners= await FCMToken.find({'user_id': device_owner_id_list[i]})
        if (fcm_device_owners?.length!=0){
            fcm_device_owners_list.push(fcm_device_owners[0].fcm_token)
        }

    }

    console.log("device owner llist",device_owner_lists)
    console.log("device owner id list", device_owner_id_list)
    console.log("fcm owner id list", fcm_device_owners_list)


    await connectToMongoDB();

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });



    for(let j=0; j<fcm_device_owners_list.length; j++){

        let message = {
            token: fcm_device_owners_list[j], // Set individual device token
            notification: {
                title: "Animal Intrusion Detected",
                body: `${animal_name}`,
            }
        };

        admin
        .messaging()
        .send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log("Successfully sent message:", response);
        })
        .catch((error) => {
            console.log("Error sending message:", error);
        });

    }

    // const messaging = admin.messaging();



    // const registrationToken =
    // "d5CDcawRT9Grb9zbZvPCt0:APA91bE1pIEiJS5j1eGXRLpJRUZ03iOOHRXWQnz_tIL8ya3tDQyP88lNaQIxRvnVv533PaaW823SnxS4VKg826Ws74Hemq5OPOxJqR5dKx4fWr1hBFgNn70";

    // const message = {
    // notification: {
    //     title: "Test title",
    //     body: "Test description",
    // },
    // token: registrationToken,
    // };

    // // Send a message to the device corresponding to the provided
    // // registration token.
    // admin
    // .messaging()
    // .send(message)
    // .then((response) => {
    //     // Response is a message ID string.
    //     console.log("Successfully sent message:", response);
    // })
    // .catch((error) => {
    //     console.log("Error sending message:", error);
    // });
}


module.exports = { notify_user };
