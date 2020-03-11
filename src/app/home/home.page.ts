import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    username: string;

    constructor(public navCtrl: NavController) {
        this.username = '';
    }

    async login() {
        await this.navCtrl.navigateForward('game', {
            queryParams: {
                username: this.username
            }
        });
    }


}
