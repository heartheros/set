import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TemplateData } from '../../../providers/data/data';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { UtilsService } from '../../../services/utils/utils';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AddTemplatePage } from '../../template/add-template/add-template';

/**
 * Generated class for the AddSetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-set',
  templateUrl: 'add-set.html',
})
export class AddSetPage {

  templates = [];
  types  = [];
  title;
  description;
  type;
  template;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TemplateData, public view: ViewController, public utilsService: UtilsService, public modalCtrl: ModalController) {
    this.dataService.getTemplates().then((templates) => {
      if (templates && templates.length > 0) {
        this.templates = templates;
        for (var i = 0; i < templates.length; i++) {
          this.types[i] = templates[i].title;
        }
      } else {
        this.utilsService.showToastWithCloseButton("top", "Please add a template first", "OK");
        this.addTemplate();
        this.close();
      }
    });
  }

  ionViewDidLoad() {
  }

  saveSet() {
    if (this.title == undefined || this.title == "") {
      this.utilsService.showToast('top', "Set can not be saved without a title!");
      return;
    }
    for (var i = 0; i < this.templates.length; i++) {
      if (this.type == this.templates[i].title) {
        this.template = this.templates[i];
        break;
      }
    }
    let newSet = {
      title: this.title,
      description: this.description,
      type: this.type,
      template: this.template,
      rows: []
    };

    this.view.dismiss(newSet);
  }

  addTemplate() {
    let addModal = this.modalCtrl.create(AddTemplatePage);
    addModal.onDidDismiss((template) => {
      if (template) {
        this.createTemplate(template);
      }
    });

    addModal.present();
  }

  createTemplate(template) {
    this.dataService.createTemplate(template);
  }

  close() {
    this.view.dismiss();
  }

}
