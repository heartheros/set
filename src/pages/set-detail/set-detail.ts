import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { AddRowPage } from '../add-row/add-row';
import { RowDetailPage } from '../row-detail/row-detail';

import { SetData } from '../../providers/set-data/set-data';

/**
 * Generated class for the SetDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-set-detail',
  templateUrl: 'set-detail.html',
})
export class SetDetailPage {

  set;
  title;
  template;
  rows = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public modalCtrl: ModalController, public dataService: SetData) {
    if (this.navParams.get('set')) {
      this.set = this.navParams.get('set');
      this.title = this.set.title;
      this.template = this.set.template;
      this.rows = this.set.rows;
    }
  }

  ionViewDidLoad() {
    
  }

  addRow() {
    let addModal = this.modalCtrl.create(AddRowPage,
      {
        template: this.template
      });
    addModal.onDidDismiss((row) => {
      if (row) {
        this.rows.push(row);
      }
    });

    addModal.present();
  }

  viewRow(row) {
    this.navCtrl.push(RowDetailPage, {
      template: this.template,
      row: row
    });
  }

  deleteRow(row) {
    let index = this.rows.indexOf(row);
    this.rows = this.rows.slice(0, index).concat(this.rows.slice(index + 1, this.rows.length));
  }

  saveSet() {
    this.set.rows = this.rows;
    this.dataService.updateSet(this.set);
    this.view.dismiss();
  }

  // close() {
  //   this.view.dismiss();
  // }

}
