import Role from '../model/Role';

class User {
    username: string;
    email: string;
    password: string;
    role: Role; 

    constructor(username: string, email: string, password: string, role: Role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

export default User;
