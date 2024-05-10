import fetch from 'node-fetch';
import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'tea-team-app',
  credentials: {
    clientId: 'WDOiZ3wkqZEzYIr6A_siiq7-',
    clientSecret: 'eCyC40jyY7hMu14FJdsEbpY0Z8T00ttw',
  },
  scopes: [
    'view_messages:tea-team-app view_attribute_groups:tea-team-app view_associate_roles:tea-team-app view_connectors:tea-team-app view_order_edits:tea-team-app manage_shopping_lists:tea-team-app view_product_selections:tea-team-app manage_my_profile:tea-team-app manage_my_quote_requests:tea-team-app view_standalone_prices:tea-team-app view_orders:tea-team-app manage_customers:tea-team-app view_states:tea-team-app manage_my_quotes:tea-team-app view_staged_quotes:tea-team-app view_quotes:tea-team-app view_types:tea-team-app view_shipping_methods:tea-team-app view_products:tea-team-app view_customer_groups:tea-team-app view_business_units:tea-team-app view_cart_discounts:tea-team-app view_quote_requests:tea-team-app manage_business_units:tea-team-app manage_my_shopping_lists:tea-team-app view_categories:tea-team-app manage_my_payments:tea-team-app view_customers:tea-team-app view_shopping_lists:tea-team-app view_discount_codes:tea-team-app view_stores:tea-team-app view_project_settings:tea-team-app manage_my_orders:tea-team-app view_connectors_deployments:tea-team-app view_tax_categories:tea-team-app manage_my_business_units:tea-team-app view_payments:tea-team-app create_anonymous_token:tea-team-app',
  ],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default ctpClient;
