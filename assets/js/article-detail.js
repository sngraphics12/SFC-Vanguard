const id = new URLSearchParams(window.location.search).get('id');

fetch('assets/js/article.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('JSON not found');
    }
    return response.json();
  })
  .then(json => {
  
    let product = json.find(item => String(item.id) === String(id));

    if (!product) {
      document.getElementById('article-detail').innerHTML = `
        <div style="text-align:center; color:#f2b95e; padding:60px;">
          <h2>Item not found</h2>
          <a href="javascript:history.back()" style="color:#9b7cff;">← Go Back</a>
        </div>`;
      return;
    }

    const imgSrc = product.image || product.image2 || '';
    const cat = product.category || product.categories || '';
    const detailsText = product.details || product.description || 'No detailed information available.';

    document.getElementById('article-detail').innerHTML = `
      <div class="detail-container" style="display:flex; flex-wrap:wrap; gap:30px; max-width:1100px; margin:40px auto; padding:20px; color:#f5f7fa;">
        
        <div class="left" style="flex:1; min-width:280px;">
          <img src="${imgSrc}" alt="${product.name}" 
               style="width:100%; max-width:420px; border-radius:12px; border:1px solid #243452; object-fit:cover;"
               onerror="this.src='https://via.placeholder.com/420x500?text=No+Image'">
        </div>

        <div class="right" style="flex:1.2; min-width:280px;">
          <p style="color:#9b7cff; text-transform:uppercase; letter-spacing:1px; font-size:13px; margin-bottom:8px;">
            ${cat}
          </p>
          <h1 style="color:#f2b95e; font-size:28px; margin:0 0 12px 0;">${product.name}</h1>
          <p style="color:#7f8c99; margin-bottom:20px;">${product.release_date || ''}</p>
          
          <p style="color:#cbd5df; line-height:1.6; margin-bottom:16px;">
            ${product.description || ''}
          </p>
          
          <p class="textarea" style="color:#f5f7fa; line-height:1.7; margin-bottom:30px;">
            ${detailsText}
          </p>
          
          <div style="display:flex; gap:15px; flex-wrap:wrap;">
            <button class="btn" style="padding:12px 28px; background:linear-gradient(108deg,#111f2a,#243746); 
                    color:#f2b95e; border:1px solid #f2b95e; border-radius:25px; cursor:pointer; font-size:15px;">
              Watch / Explore
            </button>
            <a href="javascript:history.back()" 
               style="padding:12px 28px; color:#cbd5df; text-decoration:none; border:1px solid #243746; 
                      border-radius:25px; display:inline-flex; align-items:center;">
              ← Back
            </a>
          </div>
        </div>
      </div>
    `;
  })
  .catch(error => {
    console.error(error);
    document.getElementById('article-detail').innerHTML = `
      <div style="text-align:center; color:#f2b95e; padding:60px;">
        <h2>Failed to load details</h2>
        <p style="color:#7f8c99;">Please check the JSON file path.</p>
      </div>`;
  });
