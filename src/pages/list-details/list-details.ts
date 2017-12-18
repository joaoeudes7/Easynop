import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from './../home/home';
import { Synop } from './../synop.model';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewPage } from '../view/view';
import { Chart } from 'chart.js';

/**
 * Generated class for the ListDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-list-details',
  templateUrl: 'list-details.html',
})
export class ListDetailsPage {

  public data: Synop[] = [];
  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    const temp = this.navParams.data['Synops'];
    for (let i in temp) {
      this.data.push(temp[i]);
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ionViewDidLoad() {
    const data = [];

    const chartColors = [
      { color: 'rgb(255, 99, 132)'},
      { color: 'rgb(255, 159, 64)'},
      { color: 'rgb(255, 205, 86)'},
      { color: 'rgb(75, 192, 192)'},
      { color: 'rgb(54, 162, 235)'},
      { color: 'rgb(153, 102, 255)'},
      { color: 'rgb(231,233,237)'}
    ];

    this.data.map(synop => {
      data.push({ data: [+synop.Orvalho, +synop.tempMax, +synop.PEstacao, +synop.PMar], label: `${synop.hora}`, borderColor: chartColors[this.getRandomInt(0,6)].color })
    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["Orvalho", "Temp Max", "P. Estação", "P. Mar"],
        datasets: data
      },
      options: [{
        scaleShowVerticalLines: true,
        responsive: true
      }]

    });

  }

  // Chart events
  public chartHovered(e: any): void {
    console.log(e);
  }

  public launchView(data) {
    this.navCtrl.push(ViewPage, data);
  }

  public launchEdit(data) {
    this.navCtrl.push(HomePage, data);
  }

  public launchAdd() {
    this.navCtrl.push(HomePage);
  }

  public onDelete(item) {
    this.navCtrl.push(HomePage, item);
  }

}
