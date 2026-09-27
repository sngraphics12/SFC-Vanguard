$(document).ready(function () {

  let allData = [];
  let allArticles = [];
  let allProducts = [];
  let allEvents = [];
  let allCharacters = [];
  let currentCategory = "all";
  let currentSort = "default";
  let searchQuery = "";

  function loadPage(page) {
    $.ajax({
      url: page + ".html",
      success: function (data) {
        $("#content").html(data);

        if (page === "home") {
          loadHomeData();
          bindHomeEvents();
        }
        if (page === "article") {
          loadArticles();
        }
        if (page === "store") {
          loadStore();
        }
        if (page === "events") {
          loadEvents();
        }
        if (page === "character") {
          loadCharacters();
        }
        if (page === "grid") {
          loadGallery();
        }
        if (page === "sitemap") {
          loadSitemap();
        }

         if (page === "contact") {
          loadContact();
        
        }
      },
      error: function () {
        $("#content").html("<p style='color:#7f8c99;text-align:center;padding:40px;'>Page not found</p>");
      }
    });
  }

  $("#home").click(function (e) {
    e.preventDefault();
    currentCategory = "all";
    loadPage("home");
  });

  $("#about").click(function (e) {
    e.preventDefault();
    loadPage("About");
  });

  $("#articles").click(function (e) {
    e.preventDefault();
    loadPage("article");
  });

  $("#anime").click(function (e) {
    e.preventDefault();
    currentCategory = "anime";
    loadPage("article");
  });

  $("#gaming").click(function (e) {
    e.preventDefault();
    currentCategory = "games";
    loadPage("article");
  });

  $("#movies").click(function (e) {
    e.preventDefault();
    currentCategory = "movies";
    loadPage("article");
  });

  $("#shows").click(function (e) {
    e.preventDefault();
    currentCategory = "tv-shows";
    loadPage("article");
  });

  $("#kpop").click(function (e) {
    e.preventDefault();
    currentCategory = "k-pop";
    loadPage("article");
  });

  $("#comics").click(function (e) {
    e.preventDefault();
    currentCategory = "comic";
    loadPage("article");
  });

  $("#manga").click(function (e) {
    e.preventDefault();
    currentCategory = "manga";
    loadPage("article");
  });

  $("#gallery").click(function (e) {
    e.preventDefault();
    loadPage("grid");
  });

  $("#events").click(function (e) {
    e.preventDefault();
    loadPage("events");
  });

  $("#store").click(function (e) {
    e.preventDefault();
    loadPage("store");
  });

  $("#character").click(function (e) {
    e.preventDefault();
    loadPage("character");
  });

  $("#sitemap").click(function (e) {
    e.preventDefault();
    loadPage("sitemap");
  });


  $("#gallery").click(function (e) {
    e.preventDefault();
    loadPage("grid");
  });

    $("#contact").click(function (e) {
    e.preventDefault();
    loadPage("contact");
  });

  $(".dropdown-menu a").on("click", function (e) {
    e.preventDefault();
    loadPage(this.id);
    $(".dropdown-menu").removeClass("show");
  });

  
  function loadHomeData() {
    $.ajax({
      url: "assets/js/app.json",
      type: "GET",
      dataType: "json",
      success: function (json) {
        allData = json;
        filterData();
      },
      error: function () {
        $("#myrow").html("<p style='color:#7f8c99;text-align:center;padding:30px;'>JSON not loaded</p>");
      }
    });
  }

  function showCards(data) {
    let html = "";
    if (data.length === 0) {
      html = "<p style='color:#7f8c99;text-align:center;padding:30px;'>No results found</p>";
    } else {
      data.forEach(function (item) {
        let isBookmarked = checkBookmark(item.name);
        html += `
          <div class="main-cards">
            <div class="card">
              <div class="card-img">
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="card-content">
                <p>${item.category}</p>
                <p>${item.name}</p>
                <p>${item.description}</p>
                <button class="bookmark-btn" data-name="${item.name}" data-cat="${item.category}">
                  ${isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>
              </div>
            </div>
          </div>`;
      });
    }
    $("#myrow").html(html);

    $(".bookmark-btn").off("click").on("click", function () {
      toggleBookmark($(this).data("name"), $(this).data("cat"), $(this));
    });
  }

  function filterData() {
    let result = allData.filter(function (item) {
      let cat = (item.category || "").toLowerCase();
      let name = (item.name || "").toLowerCase();
      let desc = (item.description || "").toLowerCase();
      let q = searchQuery.toLowerCase();
      let okCat = currentCategory === "all" || cat === currentCategory;
      let okSearch = q === "" || name.includes(q) || desc.includes(q) || cat.includes(q);
      return okCat && okSearch;
    });

    if (currentSort === "az") result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    else if (currentSort === "za") result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    else if (currentSort === "pop") result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    showCards(result);
  }

   
  function getBookmarks() {
    return JSON.parse(localStorage.getItem("bookmarks") || "[]");
  }

  function checkBookmark(name) {
    return getBookmarks().some(b => b.name === name);
  }

  function toggleBookmark(name, category, $btn) {
    let bookmarks = getBookmarks();
    let idx = bookmarks.findIndex(b => b.name === name);
    if (idx === -1) {
      bookmarks.push({ name: name, category: category, date: new Date().toLocaleDateString() });
      $btn.text("Bookmarked");
      alert(name + " bookmarked!");
    } else {
      bookmarks.splice(idx, 1);
      $btn.text("Bookmark");
      alert(name + " removed from bookmarks");
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  function showBookmarks() {
    let bookmarks = getBookmarks();
    let html = "<h2 style='color:#f2b95e;margin-bottom:15px;'>My Bookmarks</h2>";
    if (bookmarks.length === 0) {
      html += "<p style='color:#7f8c99;'>No bookmarks yet</p>";
    } else {
      html += "<ul style='list-style:none;padding:0;'>";
      bookmarks.forEach(function (b) {
        let note = sessionStorage.getItem("note_" + b.name) || "";
        html += `
          <li style="background:#0d1822;border:1px solid #243452;border-radius:8px;padding:12px;margin-bottom:10px;">
            <p style="color:#f2b95e;font-weight:bold;margin:0 0 5px 0;">${b.name}</p>
            <p style="color:#7f8c99;font-size:13px;margin:0 0 8px 0;">${b.category} | ${b.date || ""}</p>
            <textarea class="note-box" data-name="${b.name}" placeholder="Add personal note..."
              style="width:100%;height:50px;background:#08121a;border:1px solid #243452;color:#cbd5df;border-radius:6px;padding:6px;resize:none;">${note}</textarea>
            <button class="save-note-btn" data-name="${b.name}"
              style="margin-top:6px;padding:4px 10px;background:#243452;border:none;border-radius:5px;color:#f2b95e;cursor:pointer;font-size:12px;">
              Save Note
            </button>
          </li>`;
      });
      html += "</ul>";
      html += `<button id="exportBtn" style="margin-top:10px;padding:8px 16px;background:#315bff;border:none;border-radius:6px;color:white;cursor:pointer;">Export Bookmarks</button>`;
    }
    $("#bookmarkBox").html(html).show();

    $(".save-note-btn").off("click").on("click", function () {
      let name = $(this).data("name");
      let note = $(`.note-box[data-name="${name}"]`).val();
      sessionStorage.setItem("note_" + name, note);
      alert("Note saved!");
    });

    $("#exportBtn").off("click").on("click", exportBookmarks);
  }

  function hideBookmarks() {
    $("#bookmarkBox").hide();
  }

  function exportBookmarks() {
    let bookmarks = getBookmarks();
    if (bookmarks.length === 0) {
      alert("No bookmarks to export");
      return;
    }
    let text = "=== MY BOOKMARKS ===\n\n";
    bookmarks.forEach(function (b) {
      let note = sessionStorage.getItem("note_" + b.name) || "No note";
      text += `Name: ${b.name}\nCategory: ${b.category}\nDate: ${b.date}\nNote: ${note}\n-------------------\n`;
    });
    navigator.clipboard.writeText(text).then(function () {
      alert("Bookmarks copied!");
    }).catch(function () {
      prompt("Copy this:", text);
    });
  }

 
  function bindHomeEvents() {
    $(".search-bar input").off("input").on("input", function () {
      searchQuery = $(this).val();
      filterData();
    });

    $(".btn101").off("click").on("click", function (e) {
      e.stopPropagation();
      $(".gamesmain ul").toggle();
    });

    $(".gamesmain ul a").off("click").on("click", function (e) {
      e.preventDefault();
      let text = $(this).text().trim().toLowerCase();
      if (text === "anime") currentCategory = "anime";
      else if (text === "games") currentCategory = "games";
      else if (text === "movies") currentCategory = "movies";
      else if (text === "tv-shows") currentCategory = "tvshows";
      else if (text === "k-pop") currentCategory = "k-pop";
      else if (text === "manga") currentCategory = "manga";
      else if (text === "comics") currentCategory = "comics";
      else currentCategory = "all";
      filterData();
      $(".gamesmain ul").hide();
    });

    $(".btn102").off("click").on("click", function (e) {
      e.stopPropagation();
      if ($("#sortList").length === 0) {
        $(".gamesmain").append(`
          <ul id="sortList" style="display:none;">
            <li data-s="default">Default</li>
            <li data-s="az">Name A-Z</li>
            <li data-s="za">Name Z-A</li>
            <li data-s="pop">Popularity</li>
          </ul>`);
      }
      $("#sortList").toggle();
    });

    $(document).off("click", "#sortList li").on("click", "#sortList li", function () {
      currentSort = $(this).data("s");
      filterData();
      $("#sortList").hide();
    });

    $(document).off("click.closeMenus").on("click.closeMenus", function () {
      $(".gamesmain ul").hide();
      $("#sortList").hide();
    });

    $(".heart").off("click").on("click", function () {
      $(this).toggleClass("active");
    });

    $(".side-functions .fa-bookmark").parent().off("click").on("click", function (e) {
      e.preventDefault();
      if ($("#bookmarkBox").is(":visible")) hideBookmarks();
      else showBookmarks();
    });
  }

 
  function loadArticles() {
    fetch("assets/js/article.json")
      .then(res => res.json())
      .then(json => {
        allArticles = json;
        displayArticles(allArticles);
      })
      .catch(() => {
        $("#myrow").html("<p style='color:#f2b95e;text-align:center;padding:40px;'>Failed to load articles</p>");
      });
  }

  function displayArticles(list) {
    let html = "";
    if (list.length === 0) {
      html = "<p style='color:#f2b95e;text-align:center;padding:40px;'>No items found</p>";
    } else {
      list.forEach(function (data) {
        let img = data.image || data.image2 || "";
        let cat = data.category || data.categories || "";
        html += `
          <div class="card">
            <div class="card-img">
              <img src="${img}" alt="${data.name}" onerror="this.src='https://via.placeholder.com/280x200?text=No+Image'">
            </div>
            <div class="main-card">
              <div class="card-content">
                <p style="font-weight:bold;font-size:16px;margin-bottom:8px;">${data.name}</p>
                <p style="color:#9b7cff;text-transform:uppercase;font-size:12px;">${cat}</p>
                <p style="color:#7f8c99;font-size:12px;">${data.release_date || ""}</p>
                <p style="margin-top:10px;color:#cbd5df;font-size:13px;line-height:1.4;">
                  ${(data.description || "").substring(0, 90)}${(data.description || "").length > 90 ? "..." : ""}
                </p>
              </div>
              <div class="mybtn" style="display:flex;justify-content:flex-end;margin-right:10px;">
                <a href="article-detail.html?id=${data.id}"
                   style="padding:12px 22px;background:linear-gradient(108deg,#111f2a,#243746);
                          color:#f2b95e;border-radius:10px;text-decoration:none;
                          border:1px solid #f2b95e;margin-bottom:10px;font-size:14px;">
                  See More
                </a>
              </div>
            </div>
          </div>`;
      });
    }
    $("#myrow").html(html);
  }

 
  function loadStore() {
    fetch("assets/js/data.json")
      .then(res => res.json())
      .then(json => {
        let html = "";
        json.forEach(function (data) {
          html += `
            <div class="card">
              <div class="card-img">
                <img src="${data.image}" alt="${data.name}">
              </div>
              <div class="card-content">
                <p>${data.name}</p>
                <p>${data.short}</p>
                <p>Price: ${data.price}</p>
                <button class="add-cart-btn" data-name="${data.name}" data-price="${data.price}" data-img="${data.image}">
                  Add to Cart
                </button>
              </div>
            </div>`;
        });
        $("#p_list").html(html);

        $(".add-cart-btn").off("click").on("click", function () {
          let cart = JSON.parse(localStorage.getItem("cart") || "[]");
          cart.push({
            name: $(this).data("name"),
            price: $(this).data("price"),
            image: $(this).data("img")
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Added to cart!");
        });
      });
  }


  function loadCart() {
    fetch("assets/js/cart.json")
      .then(res => res.json())
      .then(json => {
        let html = "";
        json.forEach(function (data) {
          html += `
            <div class="card">
              <div class="card-img">
                <img src="${data.image}" alt="${data.name}">
              </div>
              <div class="card-content">
                <p>${data.name}</p>
                <p>${data.short}</p>
                <p>Price: ${data.price}</p>
                <button class="add-cart-btn">Add to Cart</button>
              </div>
            </div>`;
        });
        $("#p_list").html(html);
      });
  }

  //  EVENTS 
  function loadEvents() {
    fetch("assets/js/events.json")
      .then(res => res.json())
      .then(events => {
        let container = document.getElementById("eventsContainer");
        if (!container) return;
        container.innerHTML = "";
        events.forEach(function (event) {
          let card = document.createElement("div");
          card.className = "event";
          card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <span class="event-category">${event.category}</span>
            <span class="event-status">${event.status}</span>
            <h3>${event.title}</h3>
            <p class="location">◉ ${event.location}</p>
            <p class="date">◷ ${event.date}</p>
            <p>${event.description}</p>
            <div class="event-bottom">
              <span class="event-time">${event.time}</span>
              
            </div>`;
          container.appendChild(card);
        });
      });
  }

   
  function loadCharacters() {
    fetch("assets/js/characters.json")
      .then(res => res.json())
      .then(list => {
        let container = document.getElementById("charprofile");
        if (!container) return;
        container.innerHTML = "";
        list.forEach(function (profile) {
          let card = document.createElement("div");
          card.className = "profile";
          card.innerHTML = `
            <img src="${profile.image}" alt="${profile.name}">
            <span class="profile-category">${profile.category}</span>
            <span class="profile-series">${profile.series}</span>
            <h3>${profile.name}</h3>
            <p class="location">◉ ${profile.profile}</p>
            <p class="date">◷ ${profile.tags}</p>
            <div class="profile-bottom"></div>`;
          container.appendChild(card);
        });
      });
  }

  
  function loadArticleDetail() {
    let id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;

    fetch("assets/js/article.json")
      .then(res => res.json())
      .then(json => {
        let product = json.find(item => String(item.id) === String(id));
        if (!product) {
          $("#article-detail").html(`
            <div style="text-align:center;color:#f2b95e;padding:60px;">
              <h2>Item not found</h2>
              <a href="javascript:history.back()" style="color:#9b7cff;">← Go Back</a>
            </div>`);
          return;
        }

        let img = product.image || product.image2 || "";
        let cat = product.category || product.categories || "";
        let details = product.details || product.description || "No detailed information available.";

        $("#article-detail").html(`
          <div class="detail-container" style="display:flex;flex-wrap:wrap;gap:30px;max-width:1100px;margin:40px auto;padding:20px;color:#f5f7fa;">
            <div class="left" style="flex:1;min-width:280px;">
              <img src="${img}" alt="${product.name}"
                   style="width:100%;max-width:420px;border-radius:12px;border:1px solid #243452;object-fit:cover;"
                   onerror="this.src='https://via.placeholder.com/420x500?text=No+Image'">
            </div>
            <div class="right" style="flex:1.2;min-width:280px;">
              <p style="color:#9b7cff;text-transform:uppercase;letter-spacing:1px;font-size:13px;margin-bottom:8px;">${cat}</p>
              <h1 style="color:#f2b95e;font-size:28px;margin:0 0 12px 0;">${product.name}</h1>
              <p style="color:#7f8c99;margin-bottom:20px;">${product.release_date || ""}</p>
              <p style="color:#cbd5df;line-height:1.6;margin-bottom:16px;">${product.description || ""}</p>
              <p style="color:#f5f7fa;line-height:1.7;margin-bottom:30px;">${details}</p>
              <div style="display:flex;gap:15px;flex-wrap:wrap;">
                <button class="btn" style="padding:12px 28px;background:linear-gradient(108deg,#111f2a,#243746);
                        color:#f2b95e;border:1px solid #f2b95e;border-radius:25px;cursor:pointer;font-size:15px;">
                  Watch / Explore
                </button>
                <a href="javascript:history.back()"
                   style="padding:12px 28px;color:#cbd5df;text-decoration:none;border:1px solid #243746;
                          border-radius:25px;display:inline-flex;align-items:center;">
                  ← Back
                </a>
              </div>
            </div>
          </div>`);
      })
      .catch(() => {
        $("#article-detail").html(`
          <div style="text-align:center;color:#f2b95e;padding:60px;">
            <h2>Failed to load details</h2>
          </div>`);
      });
  }

  function updateTime() {
    let now = new Date();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = days[now.getDay()];
    let date = now.getDate();
    let m = months[now.getMonth()];
    let y = now.getFullYear();
    let h = now.getHours();
    let min = String(now.getMinutes()).padStart(2, "0");
    let sec = String(now.getSeconds()).padStart(2, "0");
    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    $("#day-date").text(d + ", " + date + " " + m.toLowerCase() + " " + y);
    $("#current-time").html(String(h).padStart(2, "0") + ":" + min + ":" + sec + " <span>" + ampm + "</span>");
    $("#current-location").text("Karachi, Pakistan");
  }
  updateTime();
  setInterval(updateTime, 1000);

  function visitors() {
    let total = parseInt(localStorage.getItem("totalVisitors") || "125430") + 1;
    localStorage.setItem("totalVisitors", total);

    let key = new Date().toDateString();
    let today = JSON.parse(localStorage.getItem("todayVisitors") || "{}");
    if (today.date !== key) today = { date: key, count: 0 };
    today.count++;
    localStorage.setItem("todayVisitors", JSON.stringify(today));

    let online = Math.floor(Math.random() * 5) + 1;

    let $els = $(".site-stats ul li span");
    if ($els.length >= 3) {
      $els.eq(0).text(total.toLocaleString());
      $els.eq(1).text(today.count.toLocaleString());
      $els.eq(2).text(online);
    }
  }
  visitors();

  
  if (window.location.pathname.includes("article-detail")) {
    loadArticleDetail();
  } else {
    loadPage("home");
  }

});