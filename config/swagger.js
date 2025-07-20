const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Product and Category API',
      version: '1.0.0',
      description: 'API for managing products and categories',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Category: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Electronics',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Laptop',
            },
            image: {
              type: 'string',
              example: 'http://example.com/image.png',
            },
            price: {
              type: 'number',
              example: 1200.50,
            },
            categoryId: {
              type: 'integer',
              example: 1,
            },
          },
        },
        ProductUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Gaming Laptop',
            },
            image: {
              type: 'string',
              example: 'http://example.com/new-image.png',
            },
            price: {
              type: 'number',
              example: 1500.00,
            },
            categoryId: {
              type: 'integer',
              example: 1,
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
