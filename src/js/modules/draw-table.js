import * as d3 from 'd3';

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

    data = data.map(m => {
        m.x = +m.x;
        m.y = +m.y;
        return m;
    }).filter(f => f)
    let blocks = [...new Set(data.map(m => m.block))];

    let maxColumns = d3.max(data.map(m => m.x))
    let maxRows = d3.max(data.map(m => m.y))

    let tileX = width / maxColumns - 5;
    let tileY = height / maxRows - 5;

    
    let tileG = svg.selectAll('.tile-g').data(data.filter(f => f.block === 'a'))
    .join(
        enter => enter.append('g').attr('class', 'tile').attr('transform', function (d) {
            return `translate(${(d.x - 1) * tileX}, ${(d.y - 1) * tileY})`;
        })
        )
        ;
        
        tileG.append('rect').attr('width', tileX).attr('height', tileY)
        .attr('stroke', 'black')
        .attr('fill', 'white');

        tileG.append('text').attr('text-anchor', 'middle').text(d => d.abbreviation).attr('transform', `translate(${tileX / 2}, ${tileY / 2})`)
        
        console.log({maxRows, height, blocks, tileY});

}