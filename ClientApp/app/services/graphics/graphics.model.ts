export interface IGraphic {
    Parameter: string,
    Flow: string,
    Points: number[]
}

export interface IGraphicsList {
    graphics: IGraphic[]
}