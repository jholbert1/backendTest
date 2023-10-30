"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeFields = void 0;
function excludeFields(user, keys) {
    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
exports.excludeFields = excludeFields;
//# sourceMappingURL=index.js.map