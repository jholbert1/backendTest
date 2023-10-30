"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_ERROR_MESSAGE = exports.PASSWORD_PATTERN = void 0;
exports.PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*().-])[A-Za-z\d!@#$%^&*().-]{1,6}$/;
exports.PASSWORD_ERROR_MESSAGE = 'La contraseña debe contener al menos 1 letra mayúscula, 1 letra minúscula, 1 número, 1 carácter especial (!@#$%^&*().-) y tener exactamente 6 caracteres.';
//# sourceMappingURL=users.constans.js.map