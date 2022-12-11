import { Role } from "src/auth/role/role.enum";

export enum Modules {
    changeRole = 'changeRole',
}

export const checkPermission = (module: Modules, role: Role) => {
    switch (module) {
        case Modules.changeRole:
            return [Role.Admin].includes(role);
    }
}