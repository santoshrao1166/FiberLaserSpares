import WooCommerceAPI from 'react-native-woocommerce-api';

export const WooCommerce_API = new WooCommerceAPI({
  url: 'https://fiberlaserspares.com', // Your store URL
  ssl: true,
  consumerKey: 'ck_ef02ab61fc91dd6c36e3e0daac0041b29aee2b19', // Your consumer secret
  consumerSecret: 'cs_46ea3d9021e81e1c66e46140f003ea408ffbc24a', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true
});