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
    const json = JSON.parse(raw);
    const categoriesSet = new Set();
    json.data.forEach(p => categoriesSet.add(p.category));

    const now = new Date();
    const categories = Array.from(categoriesSet).map(name => ({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      description: null,
      isActive: true,
      // parent_id column does NOT exist in the current schema – keep commented out or remove
      // parent_id: null,
      created_at: now,
      updated_at: now
    }));

    await queryInterface.bulkInsert('categories', categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
