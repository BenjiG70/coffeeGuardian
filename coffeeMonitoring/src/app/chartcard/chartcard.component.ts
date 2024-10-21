import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-chartcard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chartcard.component.html',
  styleUrl: './chartcard.component.scss'
})
export class ChartcardComponent {
  @Input() title:string = "undefined";
  @Input() style:'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar' = 'bar';
  @Input() options:any;
  @Input() labels:string[]=[];
  @Input() data:number[]=[];
  @Input() chartColor:string="#424242";

  src: any;

  ngOnInit() {
    this.updateChart();
  }
  ngOnChanges() {
    // Jedes Mal, wenn sich ein Input wie "data" ändert, wird das Diagramm aktualisiert
    this.updateChart();
  }

  updateChart() {
    this.src = {
      labels: this.labels,
      datasets: [
        {
          label: this.title,
          data: this.data,
          backgroundColor: [this.chartColor]
        }
      ]
    };
  }
}
