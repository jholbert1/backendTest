"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatusCode = void 0;
function ResponseStatusCode(statusCode = 200) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = new Proxy(originalMethod, {
            apply: async function (target, thisArg, args) {
                const result = await target.apply(thisArg, args);
                return {
                    statusCode,
                    data: result ? result : {},
                };
            },
        });
    };
}
exports.ResponseStatusCode = ResponseStatusCode;
//# sourceMappingURL=index.js.map