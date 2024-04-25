import * as d3 from 'd3';
import { drawBlock } from './draw-block.js';
import { getXYRange } from './getXYRange.js';
import { blockTranslate } from './block-translate.js';

/**
 * Generates a periodic table of monosaccharides.
 * 
 * @param {string} [divID='canvas'] - The ID of the HTML element where the table will be appended.
 * @returns {Promise<void>} A promise that resolves when the table is generated.
 */
export async function generateTable(divID = 'canvas') {

    let canvas = d3.select(`#${divID}`)

    let height = 500;
    let width = 1300;
    let margin = {
        right: 20
    }

    let svg = canvas.append('svg')
        .attr('height', height)
        .attr('width', width)
        ;

    // get data
    let data = await d3.tsv('./assets/monosaccharide-list.txt');

    data = data.filter(f => f.abbreviation.trim() !== "")
        .map(m => {
            m.x = +m.x;
            m.y = +m.y;
            return m;
        })

    let blocks = getXYRange(data, 'block');

    let maxColumns = d3.max(data.map(m => m.x))
    let maxRows = d3.max(data.map(m => m.y))

    let tileX = (width - margin.right) / maxColumns - 5;
    let tileY = (height) / maxRows - 20;

    for(let block in blocks) {
        let blockData = data.filter(f => f.block == block)
        let translate = `translate(${blockTranslate[block].x}, ${blockTranslate[block].y})`
        drawBlock(svg, blockData, translate, tileX, tileY, block);
    }

    canvas.append('div')
    .style("opacity", 0)
    .attr('id', 'tooltip')
    .attr("class", "")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absolute")
    
    
}