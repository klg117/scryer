import axios from "axios";

export default class ChartData {
    constructor(title, apiPath) {
        this.title = title;
        this.yAxis = 'USAGE';
        this.xAxis = 'TIME';
        this.apiPath = apiPath;
    }

    getData() {
        axios.get(this.apiPath).then(response => {
            let timeSeries = response.data[0].timeSeries;
            let rawData = Object.keys(timeSeries).map(function(key) {
                let current = timeSeries[key];
                let innerKey = Object.keys(timeSeries[key])[0];
                let innerValue = current[innerKey];
                return [Number(key), [innerKey, innerValue]];
            });
            this.data = rawData;
            this.getPartialData();
        });
    }

    getPartialData() {
        let start = this.data.length - 60;
        let end = this.data.length;
        let partialData = []
        for(let i = start; i < end; i++) {
            partialData.push(this.data[i])
        }
        this.partialData = partialData;
    }
}