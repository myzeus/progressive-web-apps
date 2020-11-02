document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
    const saved = document.querySelector('.saved');
    const btnNone = document.querySelector('.btn-large');

    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnNone.style.display = 'none';

        // ambil artikel lalu tampilkan
        getSavedClubsById();
    } else {
        var item = getClubsById();
    }

    saved.onclick = function() {
        console.log("Tombol Save di klik.");
        showNotifikasiSave()
        item.then(function(club) {
            console.log(club);
            saveForLater(club)
        })
    }
    $('.preloader-background').delay(1000).fadeOut('slow');

    $('.preloader-wrapper')
        .delay(1000)
        .fadeOut();
});

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/sw.js")
            .then(function() {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function() {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}


// Periksa fitur Notification API
if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
    Notification.requestPermission().then(function(result) {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }

        console.log("Fitur notifikasi diijinkan.");
    });
}

function showNotifikasiSave() {
    const title = 'Notifikasi dengan Gambar';
    const options = {
        'body': 'Konten berhasil disimpan',
        'image': '/img/icon2.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}