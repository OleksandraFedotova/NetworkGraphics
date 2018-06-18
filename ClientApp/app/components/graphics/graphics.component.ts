import { Component, Inject } from '@angular/core';
import { GraphicsService } from '../../services/graphics/graphics.service';
import { IGraphicsList, IGraphic } from '../../services/graphics/graphics.model';
import { Http, Request } from '@angular/http';
import { Chart, ChartData, Point } from 'chart.js';


@Component({
    selector: 'graphics',
    templateUrl: './graphics.component.html'
})
export class GraphicsComponent {
    graphics: any;
    public uploadProgress: number = 0;

    constructor(private http: Http) { }

    upload(files: any) {
        if (files.length === 0)
            return;

        const formData = new FormData();

        for (let file of files)
            formData.append(file.name, file);

        this.http.post('http://localhost:51648/api/graphics', formData).subscribe(result => {
            this.graphics = result.json();

        }, error => console.error(error));

    }

    generateGraphics() {

        var i = 1;

        for (var prop in this.graphics) {
            if (this.graphics.hasOwnProperty(prop)) {
                var elem = document.getElementById("container");
                var e = document.createElement('div');
                e.innerHTML = '<canvas id="myChart' + i + '" style="width: 800px; height: 400px;"></canvas>'
                if (elem != null) {
                    elem.appendChild(e);

                    var chartEl = document.getElementById('myChart' + i) as HTMLCanvasElement;
                    if (chartEl != null) {
                        var ctx = (chartEl).getContext('2d') as CanvasRenderingContext2D;


                        var chart: Chart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: ['20', '65', '70'],
                                datasets: []
                            },
                            options: {
                                maintainAspectRatio: false,
                            }
                        });

                        for (var flow in this.graphics[prop]) {
                            if (prop.hasOwnProperty(flow)) {

                                var data = Object.keys(this.graphics[prop][flow]).map(e => {
                                    return parseInt(this.graphics[prop][flow][e].match(/\d+/g));
                                })

                                var dataset = {
                                    backgroundColor: '#000000',
                                    borderWidth: 1,
                                    label: flow,
                                    data: data
                                }

                                chart.data.datasets.push(dataset);
                            }

                        }


                        i++;
                    }
                }

            }
        }

    }
}

