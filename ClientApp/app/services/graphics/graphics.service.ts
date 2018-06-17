import { Injectable } from '@angular/core';
import { IGraphicsList, IGraphic } from "../graphics/graphics.model";
import { Http } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class GraphicsService {

    public graphics: IGraphic[] | undefined;

    /*constructor(public http: Http) {
        getGraphics(files: string[]): IGraphic[]{
            return this.http.get('http://localhost:52952/api/graphics').subscribe(
                result => {
                this.graphics = result.json() as IGraphicsList;
            }, error => console.error(error));
        }
    }*/
    constructor(http: Http) {
        http.get('http://localhost:52952/api/graphics').subscribe(result => {
            this.graphics = result.json() as IGraphic[];
        }, error => console.error(error));
    }
    
    }



