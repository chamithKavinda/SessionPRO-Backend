class Speaker {
    id: string;
    name: string;
    bio: string;
    expertise: string;
    email: string;

    constructor(id: string, name: string, bio: string, expertise: string, email: string) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.expertise = expertise;
        this.email = email;
    }
}

export default Speaker;
