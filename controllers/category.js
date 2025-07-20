const prisma = require("../lib/prisma");

const createCategory = async (req, res, next) => {
  console.log("\n uyiyiuyiyyyiu \n ", res.body);
  // Check if category with the same name already exists (case-insensitive)
  const existingCategory = await prisma.category.findFirst({
    where: {
      name: {
        equals: req.body.name,
      },
      deletedAt: null,
    },
  });

  if (existingCategory) {
    const message = "Category with this name already exists";
    console.log(["CATEGORY_CREATE_ERROR", { message, input: req.body }]);

    return res.status(400).json({
      success: false,
      data: null,
      error: message,
    });
  }

  const category = await prisma.category.create({
    data: req.body,
  });

  res.status(201).json({
    success: true,
    data: category,
    error: null,
  });
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const categoryId = parseInt(id);

  // Check if category exists
  const existingCategory = await prisma.category.findFirst({
    where: { id: categoryId, deletedAt: null },
  });

  if (!existingCategory) {
    return res.status(404).json({
      success: false,
      data: null,
      error: "Category not found",
    });
  }

  if (
    req.body.name &&
    req.body.name.toLowerCase() !== existingCategory.name.toLowerCase()
  ) {
    const duplicateCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: req.body.name,
        },
        deletedAt: null,
        NOT: { id: categoryId },
      },
    });

    if (duplicateCategory) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Category with this name already exists",
      });
    }
  }

  const category = await prisma.category.update({
    where: { id: categoryId },
    data: req.body,
  });

  return res.json({
    success: true,
    data: category,
    error: null,
  });
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const existingCategory = await prisma.category.findFirst({
    where: { id: parseInt(id), deletedAt: null },
  });

  if (!existingCategory) {
    return res.status(404).json({
      success: false,
      data: null,
      error: "Category not found",
    });
  }

  const category = await prisma.category.update({
    where: { id: existingCategory.id },
    data: { deletedAt: new Date() },
  });

  return res.status(200).json({
    success: true,
    data: category,
    error: null,
  });
};

const getCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await prisma.category.findFirst({
    where: {
      id: parseInt(id),
      deletedAt: null,
    },
  });

  if (!category) {
    return res.status(404).json({
      success: false,
      data: null,
      error: "Category not found",
    });
  }

  return res.json({
    success: true,
    data: category,
    error: null,
  });
};

const getAllCategories = async (req, res, next) => {
  const categories = await prisma.category.findMany({
    where: {
      deletedAt: null,
    },
  });

  return res.json({
    success: true,
    data: categories,
    error: null,
  });
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};
