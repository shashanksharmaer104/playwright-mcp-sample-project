import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test.describe('FakeStore API Tests', () => {
  const API_ENDPOINT = 'https://fakestoreapi.com/products/1';

  test('should fetch product and validate response', async ({ request }) => {
    // Send GET request to the API endpoint
    const response = await request.get(API_ENDPOINT);

    // Verify status code is 200
    expect(response.status()).toBe(200);
    console.log(`✓ Response status: ${response.status()}`);

    // Get response body as JSON
    const product = await response.json();

    // Validate required keys exist
    const requiredKeys = ['id', 'price', 'category', 'description'];
    for (const key of requiredKeys) {
      expect(product).toHaveProperty(key);
    }
    console.log(`✓ All required keys present: ${requiredKeys.join(', ')}`);

    // Define JSON Schema for validation
    const productSchema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        category: { type: 'string' },
        image: { type: 'string' },
        rating: {
          type: 'object',
          properties: {
            rate: { type: 'number' },
            count: { type: 'number' }
          }
        }
      },
      required: ['id', 'price', 'category', 'description']
    };

    // Validate using Ajv
    const ajv = new Ajv();
    const validate = ajv.compile(productSchema);
    const isValid = validate(product);

    if (!isValid) {
      console.error('Schema validation errors:', validate.errors);
    }
    expect(isValid).toBeTruthy();
    console.log('✓ JSON Schema validation passed');

    // Log product title and price
    console.log(`\n📦 Product Information:`);
    console.log(`   Title: ${product.title}`);
    console.log(`   Price: $${product.price}`);
  });
});
