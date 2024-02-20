import { tileColors } from "./tile-colors";

export function drawBlock(elemnt, data, blockTranslate, tileX, tileY) {
    let blockG = elemnt.append('g').attr('class', 'block').attr('transform', blockTranslate)
    let tileG = blockG.selectAll('.tile-g').data(data)
        .join(
            enter => enter.append('g').attr('class', 'tile').attr('transform', function (d) {
                return `translate(${(d.x - 1) * tileX}, ${(d.y - 1) * tileY})`;
            })
        )
        ;

    tileG.append('rect').attr('width', tileX).attr('height', tileY)
        .attr('stroke', 'black')
        .attr('fill', (d) => {
            if (d.group == "") {
                d.group = "Nonose"
            }

            if (d.group == "Aminosugar" &&
                (d.monosaccharide.includes('Acetyl') ||
                d.monosaccharide.includes('Glycolyl')
                )
                ) {
                d.group = "Aminosugar-acetylated"
            }

            return tileColors[d.group];
        });

    tileG.append('text')
        .text(d => d.abbreviation)
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${tileX / 2}, ${tileY / 2})`)
        .attr('font-size', '10')
        .attr('font-weight', 'bold')
}