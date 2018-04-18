import axios from "axios";

export default class ChartData {
    constructor(title, apiPath) {
        this.title = title;
        this.yAxis = 'USAGE';
        this.xAxis = 'TIME';
        this.apiPath = apiPath;
    }

    getData() {
        console.log('started')
        axios.get(this.apiPath).then(response => {
            let timeSeries = response.data[0].timeSeries;
            let rawData = Object.keys(timeSeries).map(function(key) {
                let current = timeSeries[key];
                let innerKey = Object.keys(timeSeries[key])[0];
                let innerValue = current[innerKey];
                return [Number(key), [innerKey, innerValue]];
            });
            this.data = rawData;
        });
    }
}