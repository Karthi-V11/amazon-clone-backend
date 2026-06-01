import { ServiceBase } from '@src/lib/serviceBase'

export class GetSpecificProductService extends ServiceBase {
  async get(data) {
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
        { model: Category, as: 'category' },
        { model: SubCategory, as: 'subCategory' }
      ]
    })

    if (!product) {
      throw new Error('Product not found')
    }

    return {
      message: 'Product retrieved successfully',
      data: product
    }
  }
}
