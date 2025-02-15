class Session {
    sessionID: string;
    name: string;
    description: string;
    date: string;
    time: string;
    location: string;
    duration: string;
    speakerName: string;

    constructor(
        sessionID: string,
        name: string,
        description: string,
        date: string,
        time: string,
        location: string,
        duration: string,
        speakerName: string
    ) {
        this.sessionID = sessionID;
        this.name = name;
        this.description = description;
        this.date = date;
        this.time = time;
        this.location = location;
        this.duration = duration;
        this.speakerName = speakerName;
    }
}

export default Session;
