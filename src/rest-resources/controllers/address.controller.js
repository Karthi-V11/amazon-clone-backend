import { decorateResponse } from '@src/helpers/response.helpers';
import { addAddressService } from '@src/services/address/addAddress.service';
import { getAddressService } from '@src/services/address/getAddress.service';

export class AddressController {
    static async addAddress(req, res, next) {
        try {
            const result = await addAddressService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async getAddress(req, res, next) {
        try {
            const result = await getAddressService({ ...req.query }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }
}
