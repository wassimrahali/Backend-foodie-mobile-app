import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'delivery-food-mobile-app',
      contact: {
        name: 'Mehdi Ben Fekhta',
        email: 'mehdi.benfekhta@gmail.com',
      },
      version: 'v1.0',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
        description: 'Backend URL',
      },
    ],
    paths: {
      "/auth/register": {
        post: {
          tags: ['auth'],
          summary: 'Register a new customer',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Customer',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Customer registered successfully' },
          },
        },
      },
      "/auth/registerDeliveryMan": {
        post: {
          tags: ['auth'],
          summary: 'Register a new delivery man',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DeliveryMan',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Delivery man registered successfully' },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ['auth'],
          summary: 'Login a customer',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    phone: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Customer logged in successfully' },
          },
        },
      },
      "/auth/loginAdmin": {
        post: {
          tags: ['auth'],
          summary: 'Login an admin',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Admin logged in successfully' },
          },
        },
      },
      "/auth/loginDeliveryMan": {
        post: {
          tags: ['auth'],
          summary: 'Login a delivery man',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    phone: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Delivery man logged in successfully' },
          },
        },
      },
      "/auth/customers": {
        get: {
          tags: ['customers'],
          summary: 'Get all customers',
          responses: {
            '200': {
              description: 'List of all customers',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer',
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/auth/customer/{id}": {
        get: {
          tags: ['customers'],
          summary: 'Get a customer by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Customer found' },
            '404': { description: 'Customer not found' },
          },
        },
        put: {
          tags: ['customers'],
          summary: 'Update a customer',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Customer',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Customer updated successfully' },
          },
        },
        delete: {
          tags: ['customers'],
          summary: 'Delete a customer',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Customer deleted successfully' },
            '404': { description: 'Customer not found' },
          },
        },
      },
      "/auth/DileveryMan": {
        get: {
          tags: ['DeliveryMans'],
          summary: 'Get all DeliveryMans',
          responses: {
            '200': {
              description: 'List of all DeliveryMans',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/DeliveryMan',
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/auth/DileveryMan/{id}": {
        get: {
          tags: ['DeliveryMans'],
          summary: 'Get a DeliveryMan by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'DeliveryMan found' },
            '404': { description: 'DeliveryMan not found' },
          },
        },
        put: {
          tags: ['DeliveryMans'],
          summary: 'Update a DeliveryMan',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DeliveryMan',
                },
              },
            },
          },
          responses: {
            '200': { description: 'DeliveryMan updated successfully' },
          },
        },
        delete: {
          tags: ['DeliveryMans'],
          summary: 'Delete a DeliveryMan',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'DeliveryMan deleted successfully' },
            '404': { description: 'DeliveryMan not found' },
          },
        },
      },
     "/products": { 
      get: {
        tags: ['products'],
        summary: 'Get all products',
        responses: {
          '200': {
            description: 'List of all products',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['products'],
        summary: 'Create a new product',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
        responses: {
          '200': { description: 'Product created successfully' },
        },
      },
    },
      "/products/{id}": {
        get: {
          tags: ['products'],
          summary: 'Get a product by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Product found' },
            '404': { description: 'Product not found' },
          },
        },
        put: {
          tags: ['products'],
          summary: 'Update a product',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Product updated successfully' },
          },
        },
        delete: {
          tags: ['products'],
          summary: 'Delete a product',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Product deleted successfully' },
            '404': { description: 'Product not found' },
          },
        },
      },
      "/categories": {
        get: {
          tags: ['categories'],
          summary: 'Get all categories',
          responses: {
            '200': {
              description: 'List of all categories',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['categories'],
          summary: 'Create a new category',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Category created successfully' },
          },
        },
      },
      "/categories/{id}": {
        get: {
          tags: ['categories'],
          summary: 'Get a category by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Category found' },
            '404': { description: 'Category not found' },
          },
        },
        put: {
          tags: ['categories'],
          summary: 'Update a category',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Category updated successfully' },
          },
        },
        delete: {
          tags: ['categories'],
          summary: 'Delete a category',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Category deleted successfully' },
            '404': { description: 'Category not found' },
          },
        },
      },
    },
    components: {
      schemas: {
        Customer: {
          type: 'object',
          properties: {
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            phone: { type: 'string' },
          },
        },
        DeliveryMan: {
          type: 'object',
          properties: {
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            phone: { type: 'string' },
            password: { type: 'string' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            mainImage: { type: 'string' },
            price: { type: 'number', format: 'decimal' },
            otherImages: { type: 'array', items: { type: 'string' } },
            description: { type: 'string' },
            preparationDuration: { type: 'integer' },
            rating: { type: 'number', format: 'decimal' },
            sizes: { type: 'array', items: { type: 'string' } },
          },
        },
        Category: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
