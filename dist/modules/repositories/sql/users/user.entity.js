// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BaseItem: function() {
        return BaseItem;
    },
    CartItem: function() {
        return CartItem;
    },
    LibraryItem: function() {
        return LibraryItem;
    },
    User: function() {
        return User;
    },
    WishlistItem: function() {
        return WishlistItem;
    }
});
const _typeorm = require("typeorm");
const _gametagentity = require("../games-tags/game-tag.entity");
const _reviewentity = require("../reviews/review.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let User = class User extends _typeorm.BaseEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid', {
        name: 'user_id'
    }),
    _ts_metadata("design:type", String)
], User.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "username", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], User.prototype, "password", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], User.prototype, "country", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_gametagentity.GameTag, (tag)=>tag.users),
    (0, _typeorm.JoinTable)({
        name: 'users_tags'
    }),
    _ts_metadata("design:type", Array)
], User.prototype, "tags", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "verificationToken", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "phoneVerificationCode", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], User.prototype, "isPhoneVerified", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], User.prototype, "isLoggedIn", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: new Date()
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        default: []
    }),
    _ts_metadata("design:type", Array)
], User.prototype, "wishlist", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        default: []
    }),
    _ts_metadata("design:type", Array)
], User.prototype, "cart", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        default: []
    }),
    _ts_metadata("design:type", Array)
], User.prototype, "library", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_reviewentity.Review, (review)=>review.user),
    _ts_metadata("design:type", Array)
], User.prototype, "reviews", void 0);
User = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'users'
    })
], User);
let BaseItem = class BaseItem {
    constructor(id){
        this.id = id;
        this.addedOn = new Date();
    }
};
let WishlistItem = class WishlistItem extends BaseItem {
};
let CartItem = class CartItem extends BaseItem {
};
let LibraryItem = class LibraryItem extends BaseItem {
};

//# sourceMappingURL=user.entity.js.map