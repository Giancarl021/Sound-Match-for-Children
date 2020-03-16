import {Component} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    username: string;

    constructor(public router: Router) {
        this.username = '';
    }

    login() {
        const navigationExtras: NavigationExtras = {
            state: {
                user: this.username
            }
        };
        this.router.navigate(['game'], navigationExtras).catch(console.log);
    }


}
