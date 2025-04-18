const { getStorefrontApiUrl, getPublicTokenHeaders } = require('./server');
const { PRODUCTS_QUERY } = require('./queries');

module.exports = {
  generateStaticParams: async function() {
    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: PRODUCTS_QUERY,
          variables: { first: 250 }
        })
      });

      const { data } = await response.json();
      return data.products.edges.map((edge: any) => ({
        handle: edge.node.handle
      }));
    } catch (error) {
      console.error('Error generating static params:', error);
      return [];
    }
  }
};
