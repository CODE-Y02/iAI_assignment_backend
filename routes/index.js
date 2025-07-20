const express = require('express');
const router = express.Router();

const categoryRoutes = require('./categories');
const productRoutes = require('./products');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);

module.exports = router;
