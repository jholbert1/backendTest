export declare function excludeFields<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key>;
