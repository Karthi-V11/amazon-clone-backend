import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class AddProductReviewService extends ServiceBase {
    async execute(data) {
        const transaction = this.context.transaction
        try {
            const { review: Review, product: Product } = this.models
            const { productId, rating, comment, title, images } = data
            const userId = this.context.user.id

            const product = await Product.findByPk(productId, {
                transaction
            })

            const existingReview = await Review.findOne({
                where: { productId, userId },
                transaction
            })
            if (existingReview) return this.addError('ReviewAlreadyExistsErrorType')

            const review = await Review.create(
                {
                    productId,
                    userId,
                    rating,
                    comment,
                    title: title ?? null,
                    images: images ?? [],
                    helpfulCount: 0,
                    verifiedPurchase: false
                },
                { transaction }
            )

            const result = await Review.findOne({
                where: { productId },
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('rating')), 'avg'],
                    [sequelize.fn('COUNT', sequelize.col('id')), 'count']
                ],
                raw: true,
                transaction
            })

            await product.update(
                {
                    averageRating: Number(result.avg || 0).toFixed(1),
                    reviewCount: Number(result.count)
                },
                { transaction }
            )

            return {
                message: 'Review added successfully',
                data: review
            }
        } catch (error) {
            throw new APIError(error)
        }
    }
}