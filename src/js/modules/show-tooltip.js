import * as d3 from "d3";
import * as bootstrap from 'bootstrap'
import { svgarr } from './svgarr.js';

/**
 * Displays a tooltip with information about a monosaccharide.
 *
 * @param {Object} data - The data object containing information about the monosaccharide.
 */
export function showToolTip(data) {
    const myModal = bootstrap.Modal.getOrCreateInstance('#tooltipModal');
    myModal.show();

    let tooltipHeader = d3.select('#tooltipModalLabel')
    tooltipHeader.text(data.monosaccharide);

    let tooltip = d3.select('.modal-body')
    tooltip.html('');

    tooltip.transition().duration(200).style('opacity', 1)

    tooltip.append('div').attr('class', 'mb-2').text(`Abbreviation: ${data.abbreviation}`);

    tooltip.append('div').attr('class', 'mb-2').text(`Systematic Name: ${data.systematic_name}`);

    tooltip.append('div').attr('class', 'mb-2').text(`Mass: ${data.mass}`);

    tooltip.append('div').attr('class', 'mb-2').html(`Formula: ${addSubscriptsToFormula(data.formula)}`);

    let externalRefs = tooltip.append('div');
    externalRefs.append('h5').text('External References');
    let ul = externalRefs.append('ul');
    (data.kegg) ? addExternalReference(ul, 'KEGG', data.kegg) : null;
    (data.pubchem) ? addExternalReference(ul, 'PubChem', data.pubchem) : null;
    (data.chebi) ? addExternalReference(ul, 'ChEBI', data.chebi) : null;
    (data.glygen) ? addExternalReference(ul, 'Glygen', data.glygen) : null;
    (data.glyconnect) ? addExternalReference(ul, 'Glyconnect', data.glyconnect) : null;

    let symbolDiv = tooltip.append('div').attr('class', 'mb-2');

    drawSymbol(data, symbolDiv);
}

/**
 * Adds an external reference to the tooltip.
 *
 * @param {Element} ul - The unordered list element to append the reference to.
 * @param {string} reference - The name of the external reference.
 * @param {string} link - The URL of the external reference.
 */
function addExternalReference(ul, reference, link) {
    if (link !== "NA") {
        ul.append('li').append('a').attr('href', link).attr('target', '_blank').text(reference);
    }
}

/**
 * Adds subscripts to the formula string by wrapping atomic symbols and their numbers with subscript tags.
 *
 * @param {string} formula - The formula string to add subscripts to.
 * @returns {string} - The formula string with subscripts added.
 */
function addSubscriptsToFormula(formula) {
    // Use regular expression to match atomic symbols and their numbers
    const regex = /([A-Z][a-z]*)(\d*)/g;

    // Replace matched substrings with HTML format
    const result = formula.replace(regex, function (match, symbol, count) {
        // If count is empty, set it to 1
        count = count || '1';

        // Wrap the symbol and count with subscript tags
        return symbol + '<sub>' + count + '</sub>';
    });

    return result;
}

/**
 * Draws the SNFG symbol for a monosaccharide.
 *
 * @param {Object} data - The data object containing information about the monosaccharide.
 * @param {Element} symbolDiv - The div element to append the symbol to.
 */
async function drawSymbol(data, symbolDiv) {

    symbolDiv.html('<h6>SNFG Symbol:</h6>');

    let abbreviation = data.abbreviation.trim();

    let mono = svgarr.filter(f => f.id === abbreviation)[0];

    if (mono !== undefined) {
        let svgElement = symbolDiv.append('svg').attr('id', 'mono' + mono.id)
            .attr('viewBox', mono.viewBox)
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('width', '75')
            .attr('height', '75');

        svgElement
            .attr('id', 'mono' + mono.id)
            .attr('viewBox', mono.viewBox)
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('width', '75')
            .attr('height', '75');

        let g = svgElement.append('g').attr("transform", "scale(0.5 0.5) translate(25,0)");

        g.html(mono.innerhtml);
    } else {
        symbolDiv.append('p').text('No Symbol Defined');
    }

}