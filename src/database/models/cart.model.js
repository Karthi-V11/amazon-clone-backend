import { DataTypes } from 'sequelize';
import ModelBase from './base.model';

export default class Cart extends ModelBase {
    static model = 'cart';
    static table = 'carts';

    static options = {
        name: {
            singular: 'cart',
            plural: 'carts',
        },
    }

    static attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status: {
            // type: DataTypes.ENUM('active', 'abandoned', 'converted'),
            type: DataTypes.STRING,
            defaultValue: 'active',
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }

    static associate(models) {
        Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'items' });
    }
}
