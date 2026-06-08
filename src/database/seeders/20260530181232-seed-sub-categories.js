'use strict';
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Load product data
    const raw = fs.readFileSync(
      path.resolve(__dirname, '../../utils/products_180.json'),
      'utf8'
    );
    const { data } = JSON.parse(raw);

    // Load existing categories (id ↔ name map)
    const [catRows] = await queryInterface.sequelize.query(`
      SELECT id, name FROM "categories";
    `);
    const categoryMap = {};
    catRows.forEach(c => (categoryMap[c.name] = c.id));

    // Determine unique sub‑categories per parent
    const subMap = new Map(); // key: `${category}|${subCategory}`
    data.forEach(p => {
      const key = `${p.category}|${p.subCategory}`;
      if (!subMap.has(key)) {
        subMap.set(key, { category: p.category, subCategory: p.subCategory });
      }
    });

    const now = new Date();
    const records = [];
    for (const { category, subCategory } of subMap.values()) {
      records.push({
        name: subCategory,
        slug: slugify(subCategory, { lower: true, strict: true }),
        parentId: categoryMap[category],
        description: null,
        isActive: true,
        created_at: now,
        updated_at: now
      });
    }

    await queryInterface.bulkInsert('sub_categories', records, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sub_categories', null, {});
  }
};