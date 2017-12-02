import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';

import { TemplateData } from '../../providers/data/data';
import { UtilsService } from '../../services/utils/utils';

/**
 * Generated class for the TemplateDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-template-detail',
  templateUrl: 'template-detail.html',
})
export class TemplateDetailPage {

  template;
  title;
  description;
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public modalCtrl: ModalController, public dataService: TemplateData, public utilsService: UtilsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTemplatePage');
    if (this.navParams.get('template')) {
      this.template = this.navParams.get('template');
      this.title = this.navParams.get('template').title;
      this.description = this.navParams.get('template').description;
      this.items = this.navParams.get('template').items;
    }
  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.onDidDismiss((item) => {
      if (item) {
        this.items.push(item);
      }
    });
    addModal.present();
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  deleteItem(item) {
    let index = this.items.indexOf(item);
    this.items = this.items.slice(0, index).concat(this.items.slice(index + 1, this.items.length));
  }

  saveTemplate() {
    console.log(this.title);
    console.log(this.items.length);
    if (this.title == undefined || this.title == "") {
      this.utilsService.showToast('top', "Template can't be saved without a title!");
      return;
    }
    if (this.items.length == 0) {
      this.utilsService.showToast('top', "Template can't be saved without a item!");
      return;
    }
    this.template.title = this.title;
    this.template.description = this.description;
    this.template.items = this.items;

    this.dataService.updateTemplate(this.template);

    this.view.dismiss();
  }

}
