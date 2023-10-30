export const PASSWORD_PATTERN =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*().-])[A-Za-z\d!@#$%^&*().-]{1,6}$/;

export const PASSWORD_ERROR_MESSAGE =
  'La contraseña debe contener al menos 1 letra mayúscula, 1 letra minúscula, 1 número, 1 carácter especial (!@#$%^&*().-) y tener exactamente 6 caracteres.';
