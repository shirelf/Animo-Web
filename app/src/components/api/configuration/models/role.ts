
/*eslint-disable*/
export type Role = {
    role_id?: number;
    Permissions?: string[];
    role_type?: string;
}

export enum RoleEnum {
    Admin = "Admin",
    Psychologist = "Psychologist",
    General = "General"
}
