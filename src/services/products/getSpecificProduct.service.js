import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class GetSpecificProductService extends ServiceBase {
  async get(data) {
    try {
      const { product: Product, category: Category, subCategory: SubCategory } = this.models
      const { id, slug } = data

      if (!id && !slug) {
        throw new Error('Product identifier is required')
      }

      const where = {}
      if (id) where.id = id
      if (slug) where.slug = slug

      const product = await Product.findOne({
        where,
        include: [
          { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
          { model: SubCategory, as: 'subCategory', attributes: ['id', 'name', 'slug'] }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })

      if (!product) {
        throw new Error('Product not found')
      }

      return {
        message: 'Product retrieved successfully',
        data: product
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
