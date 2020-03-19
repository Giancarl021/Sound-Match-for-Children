import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatchItem} from "../classes/match-item";
import {Items} from "./Items";
import {Howl} from "howler";

import {Storage} from '@ionic/storage';
import {isNull} from "util";

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})

export class GamePage {
    user: string;
    items: MatchItem[];
    selectedItem: MatchItem;
    cols: MatchItem[][];
    wrong: MatchItem[];
    points: number;

    player: Howl;
    playing: boolean;
    right: boolean;
    firstRun: boolean;

    constructor(private router: Router, private storage: Storage) {

        storage.get(this.user).then(v => {
            if (isNull(v)) {
                storage.set(this.user, 0).then(console.log);
            } else {
                this.points = v;
            }
        });

        if (this.router.getCurrentNavigation().extras.state) {
            this.user = this.router.getCurrentNavigation().extras.state.user;
        } else {
            this.user = 'Anônimo';
        }
        this.points = 0;
        this.items = [];

        for (const item of Items) {
            const temp = new MatchItem(item);
            this.items.push(temp);
        }


        this.firstRun = true;
        this.wrong = [];
        this.right = false;
        this.player = null;
        this.playing = false;
        this.selectItem();
        this.generateColumns();
    }

    play() {
        if (this.playing) {
            return;
        }

        if (this.firstRun) this.firstRun = false;
        this.right = false;
        const audio: string = this.selectedItem.audio;

        this.player = new Howl({
            src: [audio],
            onplay: () => {
                this.playing = true;
            },
            onend: () => {
                this.playing = false;
            }
        });
        this.player.play();
    }

    private reset() {
        this.wrong = [];
        if (this.player) this.player.stop();
        this.selectItem();
        this.playing = false;
    }

    match(item) {
        if (item === this.selectedItem) {
            this.points += this.items.length - this.wrong.length;
            this.reset();
            this.right = true;
            this.storage.set(this.user, this.points).then(console.log);
        } else {
            this.wrong.push(item);
        }
    }

    private selectItem() {
        let i = Math.floor(Math.random() * this.items.length);
        while (this.items[i] === this.selectedItem) {
            i = Math.floor(Math.random() * this.items.length);
        }
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
