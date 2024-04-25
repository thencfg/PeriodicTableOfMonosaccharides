import * as d3 from 'd3';

/**
 * Calculates the range of x and y values for each unique value of a given key in the data.
 * @param {Array} data - The input data array.
 * @param {string} key - The key to group the data by.
 * @returns {Object} - An object containing the range of x and y values for each unique key value.
 */
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