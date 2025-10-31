import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../api/swagger/swagger.json',
  output: 'src/api-client',
});