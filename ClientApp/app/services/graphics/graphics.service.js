import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
var GraphicsService = /** @class */ (function () {
    function GraphicsService(http) {
        this.http = http;
    }

    GraphicsService.prototype.getGraphics = function () {
        return this.http.get("http://localhost:52952/api/graphics/");
    };

    GraphicsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], IdeasService);
    return IdeasService;
}());
export { IdeasService };