import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class AddAddressService extends ServiceBase {
    async create(payload) {
        try {
            const transaction = this.context.transaction
            const { address: Address } = this.models
            const { userId, fullName, addressLine1, addressLine2, city, state, postalCode, country, isDefault = false } = payload

            if (!userId) return this.addError('UnauthorizedErrorType')

            const addressCount = await Address.count({ where: { userId }, transaction })
            const finalIsDefault = addressCount === 0 ? true : isDefault

            const existingAddress = await Address.findOne({ where: { userId, addressLine1, postalCode } })
            if (existingAddress) return this.addError('AddressAlreadyExistsErrorType')

            if (finalIsDefault) await Address.update({ isDefault: false }, { where: { userId }, transaction })

            const address = await Address.create(
                {
                    userId,
                    fullName,
                    addressLine1,
                    addressLine2: addressLine2 || null,
                    city,
                    state,
                    postalCode,
                    country,
                    isDefault: finalIsDefault
                },
                { transaction }
            )
            return {
                message: 'Address added successfully',
                data: address.toJSON()
            }
        } catch (error) {
            throw new APIError(error)
        }
    }
}