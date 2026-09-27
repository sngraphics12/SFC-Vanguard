let allProducts = [];


fetch('assets/js/article.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('JSON file not found or network error');
    }
    return response.json();
  })
  .then(json => {
    allProducts = json;
    displayProducts(allProducts);
  })
  .catch(error => {
    console.error('Error loading products:', error);
    document.getElementById("myrow").innerHTML = `
      <p style="color:#f2b95e; text-align:center; grid-column: 1 / -1; padding: 40px;">
        Failed to load data. Please check the JSON path.
      </p>`;
  });


function displayProducts(products) {
  let html = "";

  if (products.length === 0) {
    html = `
      <p style="color:#f2b95e; text-align:center; grid-column: 1 / -1; padding: 40px;">
        No items found in this category.
      </p>`;
  } else {
    for (let data of products) {
      
      const imgSrc = data.image || data.image2 || '';
      const cat = data.category || data.categories || '';

      html += `
        <div class="card">
          <div class="card-img">
            <img src="${imgSrc}" alt="${data.name}" onerror="this.src='https://via.placeholder.com/280x200?text=No+Image'">
          </div>
          <div class="main-card">
            <div class="card-content">
              <p style="font-weight:bold; font-size:16px; margin-bottom:8px;">${data.name}</p>
              <p style="color:#9b7cff; text-transform:uppercase; font-size:12px;">${cat}</p>
              <p style="color:#7f8c99; font-size:12px;">${data.release_date || ''}</p>
              <p style="margin-top:10px; color:#cbd5df; font-size:13px; line-height:1.4;">
                ${(data.description || '').substring(0, 90)}${(data.description || '').length > 90 ? '...' : ''}
              </p>
            </div>
            <div class="mybtn" style="display:flex; justify-content:flex-end; align-items:flex-end; margin-right:10px;">
              <a href="article-detail.html?id=${data.id}"
                 style="padding:12px 22px; background:linear-gradient(108deg,#111f2a,#243746); 
                        color:#f2b95e; border-radius:10px; text-decoration:none; 
                        border:1px solid #f2b95e; margin-bottom:10px; font-size:14px;">
                See More
              </a>
            </div>
          </div>
        </div>`;
    }
  }

  document.getElementById("myrow").innerHTML = html;
}


function filterProducts(category) {
  if (category === "all") {
    displayProducts(allProducts);
    return;
  }

  let filteredData = allProducts.filter(function (product) {
  
    const productCat = (product.category || product.categories || '').toLowerCase();
    return productCat === category.toLowerCase();
  });

  displayProducts(filteredData);
}
