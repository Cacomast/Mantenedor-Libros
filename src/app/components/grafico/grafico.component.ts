import { Component, Input } from '@angular/core';

import { Grafico } from '../../interfaces/grafico';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styles: [
  ]
})
export class GraficoComponent {

  @Input('grafico') grafico:Grafico = {
    title:'Sin Título',
    labels:['label1', 'label2', 'label5'],
    values:[[20,30,50]],
    type:'doughnut'
  };

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
