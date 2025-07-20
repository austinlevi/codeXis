document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');

  fetch('https://your-strapi-url/api/products?populate=*')
    .then(res => res.json())
    .then(json => {
      const products = json.data;

      products.forEach(product => {
        const { title, price, description, gumroad_url } = product.attributes;

        // Build short description from first paragraph only
        const shortDesc = description?.[0]?.children?.[0]?.text || '';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <h2>${title}</h2>
          <p><strong>$${price}</strong></p>
          <p>${shortDesc}</p>
          <a href="${gumroad_url}" class="buy-button" target="_blank">Buy Now</a>
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => {
      grid.innerHTML = `<p>Failed to load products. Try again later.</p>`;
      console.error(err);
    });
});
