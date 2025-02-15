class User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;

    constructor(id: string, username: string, email: string, password: string, role: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

export default User;