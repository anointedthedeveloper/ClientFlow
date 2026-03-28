"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, ctx) => ctx.switchToHttp().getRequest().user);
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;
//# sourceMappingURL=index.js.map