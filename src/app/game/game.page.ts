import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatchItem} from "../classes/match-item";
import {Items} from "./Items";

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})

export class GamePage {
    user: string;
    currentAudio: string;
    items: MatchItem[];
    selectedItem: MatchItem;
    cols: MatchItem[][];

    constructor(private router: Router) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.user = this.router.getCurrentNavigation().extras.state.user;
        } else {
            this.user = 'Anônimo';
        }

        this.items = [];

        for (const item of Items) {
            this.items.push(new MatchItem(item));
        }

        this.selectItem();
        this.generateColumns();

        // this.currentAudio = '../../assets/audio/fallback.mp3';
    }

    private selectItem() {
        const i = Math.floor(Math.random() * this.items.length);
        this.selectedItem = this.items[i];
    }

    private generateColumns() {
        let tmp = [];
        this.cols = [];
        for (let i = 0; i < this.items.length; i++) {
            tmp.push(this.items[i]);
            if (i !== 0 && (i + 1) % 3 === 0) {
                this.cols.push(tmp);
                tmp = [];
            }
        }
        if (tmp.length) {
            this.cols.push(tmp);
        }
    }
}
