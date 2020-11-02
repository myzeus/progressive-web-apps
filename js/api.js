const base_url = "https://api.football-data.org/v2/competitions/2021/standings";
const url_detail = 'https://api.football-data.org/v2/teams/';
// Blok kode yang akan di panggil jika fetch berhasil

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getStandings() {
    if ("caches" in window) {
        caches.match(base_url).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    let clubsHTML = "";
                    data.standings[0].table.forEach(function(club) {
                        clubsHTML += displayGetStandings(club)
                    });
                    document.getElementById("clubs").innerHTML = clubsHTML;
                });
            }
        });
    }

    fetch(base_url, {
            method: "GET",
            headers: {
                'X-Auth-Token': 'b5fb2301a6164eac8d81928543fc0389'
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            let clubsHTML = "";
            const item = data.standings[0];
            item.table.forEach(function(club) {
                clubsHTML += displayGetStandings(club);
            });
            document.getElementById("clubs").innerHTML = clubsHTML;
        })
        .catch(error);
}

function getClubsById() {
    return new Promise(function(resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(url_detail + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        const clubsHTML = displayGetClubsById(data)
                        document.getElementById("body-content").innerHTML = clubsHTML;
                        resolve(data)
                    });
                }

            });
        }

        fetch(url_detail + idParam, {
                method: "GET",
                headers: {
                    'X-Auth-Token': 'b5fb2301a6164eac8d81928543fc0389'
                }
            })
            .then(status)
            .then(json)
            .then(function(data) {
                if (data.email === null) {
                    data.email = " - "
                }
                console.log(data);
                const clubsHTML = displayGetClubsById(data);
                document.getElementById("body-content").innerHTML = clubsHTML;
                resolve(data);
            });
    })
}

function getSavedClubs() {
    getAll().then(function(clubs) {
        console.log(clubs);
        let clubsHTML = "";
        clubs.forEach(function(club) {
            clubsHTML += deleteDisplayData(club);
        });
        if (clubs.length === 0) {
            clubsHTML += dataEmpty();
        }
        document.getElementById("body-content").innerHTML = clubsHTML;
    });
}

function getSavedClubsById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    console.log(getById(Number(idParam)));
    getById(Number(idParam)).then(function(data) {
        let clubsHTML = displayGetClubsById(data);
        document.getElementById("body-content").innerHTML = clubsHTML;
    });
}

// DISPLAY DATA TO DOM

function dataEmpty() {
    return `
    <div class="card hoverable blue-text text-darken-3" style="height: 100px; margin-top: 2em;">
        <h6 class="center bold" style="padding-top: 40px;">Your favorite team not found!</h6>
    </div>`;
}

function displayGetStandings(club) {
    return `
  <div class="card">
    <a href="./standings.html?id=${club.team.id}">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${club.team.crestUrl}" class="img-card" alt="club"/>
      </div>
    </a>
    <div class="card-content">
      <a class="waves-effect waves-light btn blue darken-3">${club.position}</a>
      <a class="btn modal-trigger grey lighten-5" href="#modal1" data-id="${club.team.id}"><span class="blue-text text-darken-3">${club.team.name}</span></a>
    </div>
  </div>`;
}

function displayGetClubsById(data) {
    return `
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${data.crestUrl}" class="img-card" alt="detail" />
        </div>
        <ul class="collection">
          <li class="collection-item">Name : ${data.name}</li>
          <li class="collection-item">Address : ${data.address}</li>
          <li class="collection-item">Email : ${data.email}</li>
          <li class="collection-item">Venue : ${data.venue}</li>
          <li class="collection-item">Phone : ${data.phone}</li>
          <li class="collection-item">Website : <a href="${data.website}">${data.website}</a></li>
      </ul>
      </div>
    `;
}

function deleteDisplayData(club) {
    return `
      <div class="card">
        <a href="./standings.html?id=${club.id}&saved=true">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${club.crestUrl}" class="img-card" alt="club" />
          </div>
        </a>
        <div class="card-content">
        <a class="btn modal-trigger blue darken-3" href="#modal1"><span class=" white-text"><strong>${club.name}</strong></span></a>
        <a class="waves-effect waves-light red btn" onclick="deleteTeamListener(${club.id})">Delete</a>
        </div>
      </div>`;
}