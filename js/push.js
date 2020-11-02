const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BLb3br6LaBbWnq69Gus8Vu6wpNHs1Jt8KuGZfwXwu4sAqg285moLLBss-m2h9l6KWKVTr0iatjHZWi2O7RV_bv4",
    "privateKey": "5_jyfXMpIIm10kFyAWCh_VdvZ2qMzqdhfYvSswGnIhE"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c-JQJD2lmNY:APA91bGIp2pB77GvEOPUBNqo-54exAExdTBKSuwSQKHHJzVNUkPrC3Wv4EE8duKIuI0yhsF4NXSROyAP5F_Y8uVzrcaDoAexOyRzRduMmttiFf7D9XYV_K475PBgNt5H7FC2y615YbG4",
    "keys": {
        "p256dh": "BEJAS1o6Tk+cpom0+cXjNJHB0gauGg0e1PwZiwYm8ti8W1J1EZ+P7DuNWLFW2GyFpIxL2rKD1cVkrdriX/ScXzQ=",
        "auth": "WCk8oBPcQ7QMZh4cZAb+5w=="
    }
}
const payload = 'Selamat! Anda menerima notifikasi!';

const options = {
    gcmAPIKey: '383434288380',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);