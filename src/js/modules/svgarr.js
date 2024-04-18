/**
 * This module fetches an SVG file containing symbols for monosaccharides and extracts relevant information from it.
 * The extracted information includes the ID, viewBox, inner HTML, and full name of each symbol.
 * The extracted data is stored in the `svgarr` variable for further use.
 *
 * @module svgarr
 */

import * as d3 from "d3";

/**
 * An array that stores the extracted information from the SVG file.
 *
 * @type {Array}
 */
export let svgarr;

// Fetch the SVG file and extract the relevant information
d3.xml(`./assets/monos.svg`).then(function (data) {
    var arr = [].map.call(data.querySelectorAll("symbol"), function (symbol) {
        return {
            id: symbol.getAttribute("data-abbr"), // Use the data-abbr to get the ID
            viewBox: symbol.getAttribute('viewBox'),
            innerhtml: symbol.innerHTML.replace(/\n|\t/g, '').trim(),
            fullname: symbol.getAttribute("data-shortname") // Use the data-shortname to get the full name
        };
    });
    svgarr = arr;
});
