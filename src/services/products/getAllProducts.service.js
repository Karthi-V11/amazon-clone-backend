import { Op } from 'sequelize'
import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class GetAllProductsService extends ServiceBase {
  async list(data) {
    try {
      const { product: Product, category: Category, subCategory: SubCategory } = this.models
      const {
        page,
        perPage,
        categoryId,
        subCategoryId,
        minPrice,
        maxPrice,
        search,
        isActive,
        sortBy,
        sortOrder
      } = data

      const where = {}

      if (categoryId) where.categoryId = categoryId
      if (subCategoryId) where.subCategoryId = subCategoryId
      if (typeof isActive !== 'undefined') where.isActive = isActive
      if (minPrice !== undefined && maxPrice !== undefined) {
        where.price = { [Op.between]: [Number(minPrice), Number(maxPrice)] }
      } else {
        if (minPrice !== undefined) where.price = { ...(where.price || {}), [Op.gte]: Number(minPrice) }
        if (maxPrice !== undefined) where.price = { ...(where.price || {}), [Op.lte]: Number(maxPrice) }
      }
      if (search) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ]
      }

      const pageNumber = Number(page) || 1
      const pageSize = Number(perPage) || 20
      const offset = (pageNumber - 1) * pageSize
      const products = await Product.findAndCountAll({
        where,
        include: [
          { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
          { model: SubCategory, as: 'subCategory', attributes: ['id', 'name', 'slug'] }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [[sortBy, sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
        limit: Number(pageSize),
        offset
      })

      return {
        message: 'Products retrieved successfully',
        data: {
          items: products.rows,
          total: products.count,
          page: Number(page),
          limit: Number(perPage)
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
