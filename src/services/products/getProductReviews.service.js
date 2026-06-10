import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class GetProductReviewsService extends ServiceBase {
    async execute(data) {
        try {
            const { review: Review, user: User } = this.models
            const sequelize = this.context.sequelize
            const {
                productId,
                page = 1,
                limit = 10,
                rating,
                sortBy = 'createdAt',
                sortOrder = 'DESC'
            } = data

            if (!productId) return this.addError('ProductIdRequiredErrorType')

            const ALLOWED_SORT_FIELDS = ['createdAt', 'rating', 'helpfulCount']
            const safeSortBy = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'createdAt'
            const safeSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'
            const safeLimit = Math.min(Number(limit), 50) // cap at 50
            const offset = (Number(page) - 1) * safeLimit

            const where = { productId }
            if (rating !== undefined) {
                const ratingNumber = Number(rating)
                if (ratingNumber < 1 || ratingNumber > 5) return this.addError('InvalidRatingErrorType')
                where.rating = ratingNumber
            }

            const reviews = await Review.findAndCountAll({
                where,
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'firstName', 'lastName', 'userName']
                    }
                ],
                attributes: { exclude: ['updatedAt'] },
                order: [[safeSortBy, safeSortOrder]],
                limit: safeLimit,
                offset
            })

            // rating breakdown: { 1: 10, 2: 5, 3: 20, 4: 80, 5: 120 }
            const breakdownRows = await Review.findAll({
                where: { productId },
                attributes: [
                    'rating',
                    [sequelize.fn('COUNT', sequelize.col('id')), 'count']
                ],
                group: ['rating'],
                raw: true
            })

            const ratingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            breakdownRows.forEach(row => {
                ratingBreakdown[row.rating] = Number(row.count)
            })

            return {
                message: 'Reviews fetched successfully',
                data: {
                    items: reviews.rows,
                    total: reviews.count,
                    page: Number(page),
                    limit: safeLimit,
                    ratingBreakdown
                }
            }
        } catch (error) {
            throw new APIError(error)
        }
    }
}