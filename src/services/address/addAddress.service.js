import { ServiceBase } from '@src/lib/serviceBase'

export class AddAddressService extends ServiceBase {
    async create(payload) {
        const transaction = this.context.transaction;
        const { userId, fullName, addressLine1, addressLine2, city, state, postalCode, country, isDefault = false } = payload

        const addressCount = await this.models.address.count({
            where: { userId },
            transaction
        });

        const finalIsDefault = addressCount === 0 ? true : isDefault;

        if (finalIsDefault) await this.models.address.update({ isDefault: false }, { where: { userId }, transaction })

        const address = await this.models.address.create(
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
            {
                transaction
            }
        );

        return address.toJSON();
    }
}