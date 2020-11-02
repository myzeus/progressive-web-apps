let dbPromised = idb.open("club-standings", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("clubs", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("id_team", "id", {
        unique: false
    });
});

function saveForLater(clubs) {
    dbPromised
        .then(function(db) {
            const tx = db.transaction("clubs", "readwrite");
            const store = tx.objectStore("clubs");

            store.put(clubs);
            return tx.complete;
        })
        .then(function() {
            console.log("Artikel berhasil di simpan.");
        });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                const tx = db.transaction("clubs", "readonly");
                const store = tx.objectStore("clubs");
                return store.getAll();
            })
            .then(function(clubs) {
                resolve(clubs);
            });
    });
}


function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("clubs", "readonly");
                let store = tx.objectStore("clubs");
                return store.get(id);
            })
            .then(function(clubs) {
                resolve(clubs);
            });
    });
}

function deleteTeam(teamId) {
    dbPromised.then(db => {
        const tx = db.transaction('clubs', 'readwrite');
        const store = tx.objectStore('clubs');
        store.delete(teamId);
        return tx.complete;
    }).then(() => {
        M.toast({ html: 'Team has been deleted!' });
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready(registration => {
                registration.showNotification('Your team has been deleted')
            })
        } else {
            console.error('Fitur Notifikasi tidak dijinkan')
        }
        getSavedClubs()
    }).catch(err => {
        console.error('Error: ' + err);
    })
}

const deleteTeamListener = teamId => {
    const confirmation = confirm('Are you sure you want to delete this team ?');
    if (confirmation === true) {
        deleteTeam(teamId);
        console.log(`Team ID : ${teamId} has been deleted`);
    }
};