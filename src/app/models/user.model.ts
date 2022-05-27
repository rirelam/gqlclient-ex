import { Role } from "./role.model";

export interface User {
  userMail: string,
  userName: string,
  rolesForUser: Role[],
}
