import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'tea-team-app' });

export default apiRoot;
