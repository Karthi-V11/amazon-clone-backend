import { decorateResponse } from '@src/helpers/response.helpers';
import { signupService } from '@src/services/user/signup.service';
import { loginService } from '@src/services/user/login.service';
import { getAllUsersService } from '@src/services/user/getAllUsers.service';
import { getSpecificUserService } from '@src/services/user/getSpecificUser.service';
import { logoutService } from '@src/services/user/logout.service';

export class UserController {
    static async signup(req, res, next) {
        try {
            const result = await signupService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const result = await loginService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const result = await getAllUsersService({ ...req.query }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async getSpecificUser(req, res, next) {
        try {
            const result = await getSpecificUserService({ ...req.params }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        try {
            const result = await logoutService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }
}
