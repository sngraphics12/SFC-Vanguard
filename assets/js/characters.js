fetch("assets/js/characters.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(events) {

        var container = document.getElementById("charprofile");

        for (var i = 0; i < events.length; i++) {

            var profile = events[i];

            var card = document.createElement("div");
            card.className = "profile";

            card.innerHTML = `
                <img src="${profile.image}" alt="${profile.title}">
                <span class="profile-category">${profile.category}</span>
                <span class="profile-series">${profile.series}</span>
                <h3>${profile.name}</h3>
                <p class="location">◉ ${profile.profile}</p>
                <p class="date">◷ ${profile.tags}</p>
                <div class="profile-bottom">
                   
                </div>`;
            container.appendChild(card);
        }
    });
