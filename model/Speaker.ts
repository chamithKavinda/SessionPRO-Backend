class Speaker {
    speakerID: string;
    name: string;
    bio: string;
    expertise: string;
    email: string;

    constructor(speakerID: string, name: string, bio: string, expertise: string, email: string) {
        this.speakerID = speakerID;
        this.name = name;
        this.bio = bio;
        this.expertise = expertise;
        this.email = email;
    }
}

export default Speaker;
