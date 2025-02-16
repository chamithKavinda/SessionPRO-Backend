class Speaker {
    name: string;
    bio: string;
    expertise: string;
    speakerEmail: string;
    image: string;

    constructor(name: string, bio: string, expertise: string, speakerEmail: string, image: string) {
        this.name = name;
        this.bio = bio;
        this.expertise = expertise;
        this.speakerEmail = speakerEmail;
        this.image = image;
    }
}

export default Speaker;
