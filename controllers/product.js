const prisma = require("../lib/prisma");

const createProduct = async (req, res, next) => {
  const { name, price, categoryId, image } = req.body;
  console.log("PRODUCT_CREATE_REQUEST", { input: req.body });

  // Validate required fields
  if (!name || price === undefined || !categoryId) {
    const message = "Name, price, and categoryId are required";
    console.log(["PRODUCT_CREATE_ERROR", { message, input: req.body }]);
    return res.status(400).json({
      success: false,
      data: null,
      error: message,
    });
  }

  // Check if category exists
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      deletedAt: null,
    },
  });

  if (!category) {
    const message = "Category not found or has been deleted";
    console.log(["PRODUCT_CREATE_ERROR", { message, categoryId }]);
    return res.status(400).json({
      success: false,
      data: null,
      error: message,
    });
  }

  // Check if product with the same name exists (MySQL is case-insensitive by default)
  const existingProduct = await prisma.product.findFirst({
    where: {
      name: name,
      deletedAt: null,
    },
  });

  if (existingProduct) {
    const message = "Product with this name already exists";
    console.log([
      "PRODUCT_CREATE_ERROR",
      { message, name, existingProductId: existingProduct.id },
    ]);
    return res.status(400).json({
      success: false,
      data: null,
      error: message,
    });
  }

  const product = await prisma.product.create({
    data: {
      name,
      price,
      categoryId,
      image,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  console.log("PRODUCT_CREATE_SUCCESS", { productId: product.id });
  return res.status(201).json({
    success: true,
    data: product,
    error: null,
  });
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, categoryId, image } = req.body;
  const productId = parseInt(id);

  console.log("PRODUCT_UPDATE_REQUEST", { productId, updateData: req.body });

  // Check if product exists
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      deletedAt: null,
    },
  });

  if (!existingProduct) {
    const message = "Product not found or has been deleted";
    console.log(["PRODUCT_UPDATE_ERROR", { message, productId }]);
    return res.status(404).json({
      success: false,
      data: null,
      error: message,
    });
  }

  // If category is being updated, check if new category exists
  if (categoryId && categoryId !== existingProduct.categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        deletedAt: null,
      },
    });

    if (!category) {
      const message = "Category not found or has been deleted";
      console.log(["PRODUCT_UPDATE_ERROR", { message, categoryId }]);
      return res.status(400).json({
        success: false,
        data: null,
        error: message,
      });
    }
  }

  // If name is being updated, check for duplicate name (MySQL is case-insensitive)
  if (name && name !== existingProduct.name) {
    const duplicateProduct = await prisma.product.findFirst({
      where: {
        name: name,
        deletedAt: null,
        NOT: { id: productId },
      },
    });

    if (duplicateProduct) {
      const message = "Product with this name already exists";
      console.log(["PRODUCT_UPDATE_ERROR", { message, name, productId }]);
      return res.status(400).json({
        success: false,
        data: null,
        error: message,
      });
    }
  }

  const updateData = {
    name: name || existingProduct.name,
    price: price !== undefined ? price : existingProduct.price,
    categoryId: categoryId || existingProduct.categoryId,
    image: image !== undefined ? image : existingProduct.image,
  };

  const product = await prisma.product.update({
    where: { id: productId },
    data: updateData,
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  console.log("PRODUCT_UPDATE_SUCCESS", { productId });
  return res.status(200).json({
    success: true,
    data: product,
    error: null,
  });
};

// Other functions remain unchanged
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const productId = parseInt(id);

  console.log("PRODUCT_DELETE_REQUEST", { productId });

  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      deletedAt: null,
    },
  });

  if (!existingProduct) {
    const message = "Product not found or has been deleted";
    console.log(["PRODUCT_DELETE_ERROR", { message, productId }]);
    return res.status(404).json({
      success: false,
      data: null,
      error: message,
    });
  }

  const product = await prisma.product.update({
    where: { id: productId },
    data: { deletedAt: new Date() },
  });

  console.log("PRODUCT_DELETE_SUCCESS", { productId });
  return res.status(200).json({
    success: true,
    data: product,
    error: null,
  });
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;
  const productId = parseInt(id);

  console.log("PRODUCT_GET_REQUEST", { productId });

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      deletedAt: null,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!product) {
    const message = "Product not found or has been deleted";
    console.log(["PRODUCT_GET_ERROR", { message, productId }]);
    return res.status(404).json({
      success: false,
      data: null,
      error: message,
    });
  }

  console.log("PRODUCT_GET_SUCCESS", { productId });
  return res.status(200).json({
    success: true,
    data: product,
    error: null,
  });
};

const getAllProducts = async (req, res, next) => {
  console.log("PRODUCTS_LIST_REQUEST");

  const products = await prisma.product.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("PRODUCTS_LIST_SUCCESS", { count: products.length });
  return res.status(200).json({
    success: true,
    data: products,
    error: null,
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
