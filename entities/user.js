import uid from "../lib/uid.js";

const User = class {
  constructor(role) {
    this.session_id = uid();
    this.role = role;
  }
};

const Guest = class extends User {
  constructor() {
    super("guest");
    this.username = "Guest" + this.session_id;
  }
};

export { User, Guest };
