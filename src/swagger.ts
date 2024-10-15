import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "delivery-food-mobile-app",
            contact: {
                name: "Mehdi Ben Fekhta",
                email: "mehdi.benfekhta@gmail.com",
            },
            version: "v1.0",
        },
        servers: [
            {
                url: "http://localhost:8000/api",
                description: "backend url",
            },
        ],
        paths: {
            "/auth/register": {
                post: {
                    tags: ["auth"],
                    summary: "Register a new customer",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Customer",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Customer registered successfully",
                        },
                    },
                },
            },
            "/auth/registerDileveryMan": {
                post: {
                    tags: ["auth"],
                    summary: "Register a new delivery man",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DileveryMan",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Delivery man registered successfully",
                        },
                    },
                },
            },
            "/auth/login": {
                post: {
                    tags: ["auth"],
                    summary: "Login a customer",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        phone: { type: "string" },
                                        password: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Customer logged in successfully",
                        },
                    },
                },
            },
            "/auth/loginAdmin": {
                post: {
                    tags: ["auth"],
                    summary: "Login an admin",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string" },
                                        password: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        "200": { description: "Admin logged in successfully" },
                    },
                },
            },
            "/auth/loginDileveryMan": {
                post: {
                    tags: ["auth"],
                    summary: "Login a delivery man",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        phone: { type: "string" },
                                        password: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Delivery man logged in successfully",
                        },
                    },
                },
            },
            //"/auth/{id}": {
            //   delete: {
            //     tags: ['auth'],
            //     summary: 'Delete a customer by ID',
            //     parameters: [
            //       {
            //         name: 'id',
            //         in: 'path',
            //         required: true,
            //         schema: {
            //           type: 'integer',
            //           format: 'int32',
            //         },
            //       },
            //     ],
            //     responses: {
            //       '200': { description: 'Customer deleted successfully' },
            //       '404': { description: 'Customer not found' },
            //     },
            //   },
            // },
            "/products": {
                get: {
                    tags: ["products"],
                    summary: "Get all products",
                    responses: {
                        "200": {
                            description: "List of all products",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Product",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ["products"],
                    summary: "Create a new product",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": { description: "Product created successfully" },
                    },
                },
            },
            "/products/{id}": {
                get: {
                    tags: ["products"],
                    summary: "Get a product by ID",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                                format: "int32",
                            },
                        },
                    ],
                    responses: {
                        "200": { description: "Product found" },
                        "404": { description: "Product not found" },
                    },
                },
            },
            "/categories": {
                get: {
                    tags: ["categories"],
                    summary: "Get all categories",
                    responses: {
                        "200": {
                            description: "List of all categories",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Category",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ["categories"],
                    summary: "Create a new category",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Category",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": { description: "Category created successfully" },
                    },
                },
            },
            "/categories/{id}": {
                get: {
                    tags: ["categories"],
                    summary: "Get a category by ID",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                                format: "int32",
                            },
                        },
                    ],
                    responses: {
                        "200": { description: "Category found" },
                        "404": { description: "Category not found" },
                    },
                },
            },
            "/upload": {
                post: {
                    tags: ["image-upload"],
                    summary: "upload an image and get its url",
                    parameters: [{}],
                    responses: {
                        "200": { description: "image uploaded" },
                        "500": {
                            description: "error while uploading the image",
                        },
                    },
                },
            },
        },
        components: {
            schemas: {
                Customer: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            default: "string",
                        },
                        email: {
                            type: "string",
                            default: "string",
                        },
                        phone: {
                            type: "string",
                            default: "string",
                        },
                        password: {
                            type: "string",
                            default: "string",
                        },
                    },
                },
                DileveryMan: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            default: "string",
                        },
                        phone: {
                            type: "string",
                            default: "string",
                        },
                        password: {
                            type: "string",
                            default: "string",
                        },
                        salary: {
                            type: "number",
                            format: "decimal",
                        },
                    },
                },
                Admin: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            default: "string",
                        },
                        email: {
                            type: "string",
                            default: "string",
                        },
                        password: {
                            type: "string",
                            default: "string",
                        },
                    },
                },
                Category: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                        },
                        image: {
                            type: "string",
                        },
                    },
                },
                Product: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                        },
                        mainImage: {
                            type: "string",
                        },
                        price: {
                            type: "number",
                            format: "decimal",
                        },
                        otherImages: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            default: [],
                        },
                        description: {
                            type: "string",
                            default: "",
                        },
                        preparationDuration: {
                            type: "string",
                            default: "20 min",
                        },
                        rating: {
                            type: "number",
                            format: "decimal",
                            default: 5,
                        },
                        sizes: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            default: [],
                        },
                        categoryId: {
                            type: "integer",
                            format: "int32",
                        },
                    },
                },
                Order: {
                    type: "object",
                    properties: {
                        totalPrice: {
                            type: "number",
                            format: "decimal",
                        },
                        status: {
                            type: "string",
                            enum: [
                                "NOT_VALIDATED",
                                "VALIDATED",
                                "READY",
                                "ON_ROAD",
                                "DELIVERED",
                                "RETURNED",
                            ],
                            default: "NOT_VALIDATED",
                        },
                        location: {
                            type: "string",
                        },
                        customerId: {
                            type: "integer",
                            format: "int32",
                        },
                        deliveryManId: {
                            type: "integer",
                            format: "int32",
                        },
                    },
                },
                OrderItem: {
                    type: "object",
                    properties: {
                        quantity: {
                            type: "integer",
                        },
                        productId: {
                            type: "integer",
                            format: "int32",
                        },
                        orderId: {
                            type: "integer",
                            format: "int32",
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: "auth",
                description: "Authentication and user-related operations",
            },
            { name: "products", description: "Products related operations" },
            {
                name: "categories",
                description: "Categories related operations",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
},
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
      },
    },
    components: {
      schemas: {
        Customer: {
          type: 'object',
          properties: {
            name: { type: 'string', default: 'string' },
            email: { type: 'string', default: 'string' },
            phone: { type: 'string', default: 'string' },
            password: { type: 'string', default: 'string' },
          },
        },
        DeliveryMan: {
          type: 'object',
          properties: {
            name: { type: 'string', default: 'string' },
            phone: { type: 'string', default: 'string' },
            password: { type: 'string', default: 'string' },
            salary: { type: 'number', format: 'decimal' },
          },
        },
        Admin: {
          type: 'object',
          properties: {
            name: { type: 'string', default: 'string' },
            email: { type: 'string', default: 'string' },
            password: { type: 'string', default: 'string' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            image: { type: 'string' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            mainImage: { type: 'string' },
            price: { type: 'number', format: 'decimal' },
            otherImages: {
              type: 'array',
              items: { type: 'string' },
              default: [],
            },
            description: { type: 'string', default: '' },
            preparationDuration: { type: 'string', default: '20 min' },
            rating: { type: 'number', format: 'decimal', default: 5 },
            sizes: {
              type: 'array',
              items: { type: 'string' },
              default: [],
            },
            categoryId: { type: 'integer', format: 'int32' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            totalPrice: { type: 'number', format: 'decimal' },
            status: {
              type: 'string',
              enum: [
                'NOT_VALIDATED',
                'VALIDATED',
                'READY',
                'ON_ROAD',
                'DELIVERED',
                'RETURNED',
              ],
              default: 'NOT_VALIDATED',
            },
            location: { type: 'string' },
            customerId: { type: 'integer', format: 'int32' },
            deliveryManId: { type: 'integer', format: 'int32' },
          },
        },
        OrderItem: {
          type: 'object',
          properties: {
            quantity: { type: 'integer' },
            productId: { type: 'integer', format: 'int32' },
            orderId: { type: 'integer', format: 'int32' },
          },
        },
      },
    },
    tags: [
      { name: 'auth', description: 'Authentication and user-related operations' },
      { name: 'customers', description: 'Customers related operations' },
      { name: 'products', description: 'Products related operations' },
      { name: 'categories', description: 'Categories related operations' },
    ],
  },
  apis: ['./src/routes/*.ts'], // Update this if your files are compiled into JavaScript
};

// Initialisation de Swagger
const swaggerSpec = swaggerJSDoc(options)
// Initialize Swagger
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec }
