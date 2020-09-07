import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="footer" >
            <div class="card clearfix">
                <span class="footer-text-left">WEBSDPS</span>
                <span class="footer-text-right">
                    <span class="material-icons ui-icon-copyright"></span>
                    <span>Scania Deutschland GmbH, August-Horch-Straße 10, 56070 Koblenz</span>
                    <span>&nbsp;All Rights Reserved</span>
                </span>
            </div>
        </div>
    `
})
export class AppFooterComponent {

}
