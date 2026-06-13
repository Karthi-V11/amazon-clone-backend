import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class SelectAddressService extends ServiceBase {
  async select(data) {
    const transaction = this.context.transaction
    try {
      const { address: Address, checkout_session: CheckoutSession } = this.models
      const { userId, addressId, checkoutSessionId } = data

      if (!userId || !addressId || !checkoutSessionId) return this.addError('Invalid payload')

      const address = await Address.findOne({ where: { id: addressId, userId } })
      if (!address) return this.addError('AddressNotFoundErrorType')

      const checkout = await CheckoutSession.findOne({ where: { id: checkoutSessionId, userId } })
      if (!checkout) return this.addError('CheckoutSessionNotFoundErrorType')

      await checkout.update({ shippingAddressId: address.id, status: 'address_selected' }, { transaction })

      return {
        message: 'Address selected successfully',
        data: {
          checkoutSessionId: checkout.id,
          addressId: address.id,
          status: 'address_selected'
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}