// import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// // import { ChartConfiguration, ChartType } from 'chart.js';

// @Component({
//   selector: 'app-pie-chart',
//   templateUrl: './pie-chart.component.html',
//   styleUrls: ['./pie-chart.component.scss'],
//   standalone: true,
//   // imports: [NgChartsModule, CommonModule]
// })
// export class PieChartComponent implements OnChanges {
//   @Input() chartData: ChartConfiguration['data'] = { // Define Input and its type
//     labels: [],
//     datasets: [{ data: [] }],
//   };

//   public pieChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//     },
//   };
//   public pieChartType: ChartType = 'pie';

//   ngOnChanges(changes: SimpleChanges): void {
//     // Update chart data only if the 'chartData' input changes.
//     if (changes['chartData'] && this.chartData) {
//         //No need to update any signal, just use chartData Input.
//     }
//   }
// }
