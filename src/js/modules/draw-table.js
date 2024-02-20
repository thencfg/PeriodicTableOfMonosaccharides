import * as d3 from 'd3';
import { drawBlock } from './draw-block';
import { getXYRange } from './getXYRange';
import { blockTranslate } from './block-translate';

export async function generateTable(divID = 'canvas') {

    let canvas = d3.select(`#${divID}`)

    let height = 500;
    let width = 1300;

    let svg = canvas.append('svg')
        .attr('height', height)
        .attr('width', width)
        ;

    // get data
    let data = await d3.tsv('./monosaccharide-list.txt');

    data = data.filter(f => f.abbreviation.trim() !== "")
        .map(m => {
            m.x = +m.x;
            m.y = +m.y;
            return m;
        })

    let blocks = getXYRange(data, 'block');
    let groups = getXYRange(data, 'group');
    let periods = getXYRange(data, 'period');


    let maxColumns = d3.max(data.map(m => m.x))
    let maxRows = d3.max(data.map(m => m.y))

    let tileX = width / maxColumns - 5;
    let tileY = (height) / maxRows - 15;

    for(let block in blocks) {
        let blockData = data.filter(f => f.block == block)
        let translate = `translate(${blockTranslate[block].x}, ${blockTranslate[block].y})`
        drawBlock(svg, blockData, translate, tileX, tileY);
    }
    
    
}