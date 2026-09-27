let html = ""
fetch('assets/js/data.json')
      .then(response => response.json())
      .then(json => {
        for (let data of json){
           html += `    
           <div class="card">
            <div class="card-img">
                <img src="${data.image}" alt="${data.title}">
            </div>
            <div class="card-content">
                
                <p>${data.name}</p>
                <p> ${data.short}</p>
                <p> Price: ${data.price}</p>
                <button id="cart-btn">Add to Cart</button>
               
            </div>
        </div>`
        }
        document.getElementById('p_list').innerHTML = html;
        })