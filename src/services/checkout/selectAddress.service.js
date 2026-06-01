import { ServiceBase } from '@src/lib/serviceBase'

export class SelectAddressService extends ServiceBase {
  async select(data) {
    const { address: Address } = this.models
    const { userId, addressId } = data

    if (!userId || !addressId) {
      throw new Error('userId and addressId are required')
    }

    const address = await Address.findOne({ where: { id: addressId, userId } })
    if (!address) {
      throw new Error('Address not found')
    }

    return {
      message: 'Address selected successfully',
      data: address
    }
  }
}
