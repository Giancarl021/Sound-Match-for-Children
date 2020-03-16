export class MatchItem {

    public image: string;
    public audio: string;

    constructor(name: string, imageExtension: string = 'png', audioExtension: string = 'mp3') {
        this.image = `../../assets/images/${name}.${imageExtension}`;
        this.audio = `../../assets/audio/${name}.${audioExtension}`;
    }
}
