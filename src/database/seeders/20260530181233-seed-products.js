'use strict'
const fs = require('fs')
const path = require('path')
const slugify = require('slugify')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Load product data
    const raw = fs.readFileSync(
      path.resolve(__dirname, '../../utils/products_180.json'),
      'utf8'
    );
    const { data } = JSON.parse(raw);

    // Load category map (id ↔ name)
    const [catRows] = await queryInterface.sequelize.query(`
      SELECT id, name FROM "categories";
    `);
    const categoryMap = {};
    catRows.forEach(c => (categoryMap[c.name] = c.id));

    // Load sub‑category map (key: "category|subCategory" → id)
    const [subRows] = await queryInterface.sequelize.query(`
      SELECT id, name, "parentId" FROM "sub_categories";
    `);
    const subCategoryMap = {};
    subRows.forEach(sc => {
      const parentName = Object.entries(categoryMap).find(([, id]) => id === sc.parentId)?.[0];
      const key = `${parentName}|${sc.name}`;
      subCategoryMap[key] = sc.id;
    })
    console.log(subCategoryMap);

    const products = data.map(p => ({
      title: p.title,
      description: null,
      slug: slugify(p.title, { lower: true, strict: true }),
      price: p.price,
      compareAtPrice: null,
      stockQuantity: Number(p.quantity),
      imageUrl: (p.images && p.images[0]) || null,
      isActive: p.inStock,
      inStack: p.inStock,
      brand: p.brand,
      categoryId: categoryMap[p.category],
      subCategoryId: subCategoryMap[`${p.category}|${p.subCategory}`],
      created_at: new Date(p.createdAt),
      updated_at: new Date(p.updatedAt)
    }))

    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
