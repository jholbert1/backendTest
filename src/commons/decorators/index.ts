export function ResponseStatusCode(statusCode = 200) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
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
