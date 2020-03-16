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
        this.currentAudio = '../../assets/audio/fallback.mp3';
    }

    private selectItem() {
        const i = Math.floor(Math.random() * this.items.length);
        this.selectedItem = this.items[i];
    }
}
