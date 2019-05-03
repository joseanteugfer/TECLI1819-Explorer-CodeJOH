import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardResultLatest: any;
  topKeywords: [];
  orderedtripsPerTrips: any;
  avgPriceRangeFinders: number;
  computationMoment: string;
  pricePerTrips: any;
  rebuildPeriod: string;
  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Ordered Trips Per Trips' }
  ];

  public chartLabels: Array<any> = ['avgOrderedTrips', 'maxOrderedTrips', 'minOrderedTrips', 'stdDevOrderedTrips', 'totalOrderedTrips'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getDashboardLatest()
        .subscribe(result => {
          this.dashboardResultLatest = result[0];
          console.log(this.dashboardResultLatest);
          if (this.dashboardResultLatest['topKeywordsFinders'].length > 0) {
            this.topKeywords = this.dashboardResultLatest['topKeywordsFinders'][0]['topKeywords'];
          }
          if (this.dashboardResultLatest['orderedtripsPerTrips']) {
            this.orderedtripsPerTrips = this.dashboardResultLatest['orderedtripsPerTrips'];
            for (let key in this.orderedtripsPerTrips) {
              this.chartDatasets[0]['data'].push(this.orderedtripsPerTrips[key]);
            }
          }
          if (this.dashboardResultLatest['avgPriceRangeFinders']) {
            this.avgPriceRangeFinders = this.dashboardResultLatest['avgPriceRangeFinders'];
          }
          if (this.dashboardResultLatest['computationMoment']) {
            this.computationMoment = this.dashboardResultLatest['computationMoment'];
          }
        });
  }

}
