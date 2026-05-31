'use strict';
const fs = require('fs');
const path = require('path');

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
      SELECT id, name, parent_id FROM "sub_categories";
    `);
    const subCategoryMap = {};
    subRows.forEach(sc => {
      const parentName = Object.entries(categoryMap).find(([, id]) => id === sc.parent_id)[0];
      const key = `${parentName}|${sc.name}`;
      subCategoryMap[key] = sc.id;
    });

    const products = data.map(p => ({
      title: p.title,
      description: null,
      price: p.price,
      compare_at_price: null,
      stock_quantity: Number(p.quantity),
      image_url: (p.images && p.images[0]) || null,
      is_active: p.inStock,
      in_stack: p.inStock,
      brand: p.brand,
      category_id: categoryMap[p.category],
      sub_category_id: subCategoryMap[`${p.category}|${p.subCategory}`],
      created_at: new Date(p.createdAt),
      updated_at: new Date(p.updatedAt)
    }));

    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
