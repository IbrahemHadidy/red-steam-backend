// TypeORM
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
    Company: function() {
        return Company;
    },
    Developer: function() {
        return Developer;
    },
    Publisher: function() {
        return Publisher;
    }
});
const _typeorm = require("typeorm");
const _gameentity = require("../games/game.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Company = class Company extends _typeorm.BaseEntity {
};
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Company.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Company.prototype, "website", void 0);
let Publisher = class Publisher extends Company {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('increment', {
        name: 'publisher_id'
    }),
    _ts_metadata("design:type", Number)
], Publisher.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_gameentity.Game, (game)=>game.publishers),
    _ts_metadata("design:type", Array)
], Publisher.prototype, "games", void 0);
Publisher = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'publishers'
    })
], Publisher);
let Developer = class Developer extends Company {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('increment', {
        name: 'developer_id'
    }),
    _ts_metadata("design:type", Number)
], Developer.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_gameentity.Game, (game)=>game.developers),
    _ts_metadata("design:type", Array)
], Developer.prototype, "games", void 0);
Developer = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'developers'
    })
], Developer);

//# sourceMappingURL=company.entity.js.map