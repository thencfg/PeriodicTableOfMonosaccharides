import * as d3 from 'd3';

export function getXYRange(data, key) {
    let values = [...new Set(data.map(m => m[key]))];

    let obj = {};
    values = values.map(m => {
        let filteredData = data.filter(f => f[key] == m)
        obj[m] = {
            'minX' : d3.min(filteredData, (d) => d.x),
            'minY' : d3.min(filteredData, (d) => d.y),
            'maxX' : d3.max(filteredData, (d) => d.x),
            'maxY' : d3.max(filteredData, (d) => d.y),
        };
    })

    return obj;
}