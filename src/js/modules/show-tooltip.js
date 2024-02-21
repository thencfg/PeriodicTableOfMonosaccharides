import * as d3 from "d3";
import * as bootstrap from 'bootstrap'

export function showToolTip(data) {
    console.log(data);

    const myModal = bootstrap.Modal.getOrCreateInstance('#tooltipModal');
    myModal.show();

    let tooltipHeader = d3.select('#tooltipModalLabel')
    tooltipHeader.text(data.monosaccharide);

    let tooltip = d3.select('.modal-body')
    tooltip.html('');

    tooltip.transition().duration(200).style('opacity', 1)

    tooltip.append('div').attr('class', 'mb-2').text(`Abbreviation: ${data.abbreviation}`);
    
    tooltip.append('div').attr('class', 'mb-2').text(`Mass: ${data.mass}`);
    
    tooltip.append('div').attr('class', 'mb-2').html(`Formula: ${addSubscriptsToFormula(data.formula)}`);

    let externalRefs = tooltip.append('div');
    externalRefs.append('h5').text('External References');
    (data.kegg) ? addExternalReference(externalRefs, 'KEGG', data.kegg) : null;
    (data.pubchem) ? addExternalReference(externalRefs, 'PubChem', data.pubchem) : null;
    (data.chebi) ? addExternalReference(externalRefs, 'ChEBI', data.chebi) : null;
    (data.glygen) ? addExternalReference(externalRefs, 'Glygen', data.glygen) : null;
    (data.glyconnect) ? addExternalReference(externalRefs, 'Glyconnect', data.glyconnect) : null;

}

function addExternalReference(element, reference, link) {
    let ul = element.append('ul')
    ul.append('li').append('a').attr('href', link).attr('target', '_blank').text(reference);
}

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