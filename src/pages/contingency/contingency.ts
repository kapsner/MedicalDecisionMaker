import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';

/**
 * Generated class for the ContingencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contingency',
  templateUrl: 'contingency.html',
})
export class ContingencyPage {

  item: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public shareProvider: ShareProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContingencyPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ContingencyPage');
    this.item = this.shareProvider.item;
    console.log("this.item: ", this.item);
  }

}
