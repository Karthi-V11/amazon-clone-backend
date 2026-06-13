'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('coupons', [
      {
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        minOrderAmount: 500,
        maxDiscount: 200,
        isActive: true,
        expiryDate: new Date('2027-12-31T23:59:59.000Z'),
        usageLimit: 100,
        usedCount: 0,
        moreDetails: JSON.stringify({
          description: '10% off up to ₹200'
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE500',
        type: 'flat',
        value: 500,
        minOrderAmount: 3000,
        maxDiscount: null,
        isActive: true,
        expiryDate: new Date('2027-12-31T23:59:59.000Z'),
        usageLimit: 50,
        usedCount: 0,
        moreDetails: JSON.stringify({
          description: 'Flat ₹500 off'
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'FIRST20',
        type: 'percentage',
        value: 20,
        minOrderAmount: 1000,
        maxDiscount: 300,
        isActive: true,
        expiryDate: new Date('2027-12-31T23:59:59.000Z'),
        usageLimit: 200,
        usedCount: 0,
        moreDetails: JSON.stringify({
          description: '20% off up to ₹300'
        }),
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('coupons', {
      code: ['WELCOME10', 'SAVE500', 'FIRST20']
    })
  }
}