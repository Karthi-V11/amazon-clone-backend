import { Op } from 'sequelize'
import { ServiceBase } from '@src/lib/serviceBase'

export class GetAllProductsService extends ServiceBase {
  async list(data) {
    const { product: Product, category: Category, subCategory: SubCategory } = this.models
    const {
      page = 1,
      limit = 20,
      categoryId,
      subCategoryId,
      minPrice,
      maxPrice,
      search,
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = data

    const where = {}

    if (categoryId) where.categoryId = categoryId
    if (subCategoryId) where.subCategoryId = subCategoryId
    if (typeof isActive !== 'undefined') where.isActive = isActive
    if (minPrice && maxPrice) {
      where.price = { [Op.between]: [minPrice, maxPrice] }
    } else {
      if (minPrice) where.price = { ...(where.price || {}), [Op.gte]: minPrice }
      if (maxPrice) where.price = { ...(where.price || {}), [Op.lte]: maxPrice }
    }
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ]
    }

    const offset = (Number(page) - 1) * Number(limit)
    const products = await Product.findAndCountAll({
      where,
      include: [
        { model: Category, as: 'category' },
        { model: SubCategory, as: 'subCategory' }
      ],
      order: [[sortBy, sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
      limit: Number(limit),
      offset
    })

    return {
      message: 'Products retrieved successfully',
      data: {
        items: products.rows,
        total: products.count,
        page: Number(page),
        limit: Number(limit)
      }
    }
  }
}
