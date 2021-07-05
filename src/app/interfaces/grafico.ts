import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

export interface Grafico {
    title:string;
    labels:Label[];
    values:MultiDataSet;
    type:ChartType;
}
