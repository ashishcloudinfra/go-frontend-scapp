import { Role } from "../app/features/token";
import { Company } from "../types/Company";

export class AuthNavigator {
  company: Company;
  role: string;

  constructor(company: Company, role: Role) {
    this.company = company;
    this.role = role;
  }

  getLandingPath() {
    return `/${this.company.type.toLowerCase()}/${this.role.toLowerCase()}/dashboard`
  }
}
