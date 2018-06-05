
export class Agent {
  public agentId: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public email: string;
  public status: string;
  public action: any;

  constructor(id: string, firstName: string, lastName: string, phone: string, email: string, status: string, action: any) {
    this.agentId = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.status = status;
    this.action = action;
  }
}
