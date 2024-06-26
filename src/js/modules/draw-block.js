import { tileColors } from "./tile-colors.js";
import { showToolTip } from "./show-tooltip.js";
import { drawLabels } from "./draw-labels.js";

/**
 * Draws a block of tiles representing monosaccharides.
 *
 * @param {Selection} elemnt - The SVG element to append the block to.
 * @param {Array} data - The data array containing information about each tile.
 * @param {string} blockTranslate - The translation value for the block.
 * @param {number} tileX - The width of each tile.
 * @param {number} tileY - The height of each tile.
 * @param {string} block - The class name for the block.
 */
export function drawBlock(elemnt, data, blockTranslate, tileX, tileY, block) {
    let blockG = elemnt.append('g').attr('class', 'block').attr('transform', blockTranslate)

    drawLabels(blockG, data, tileX, tileY, block);

    let tileG = blockG.selectAll('.tile-g').data(data)
        .join(
            enter => enter.append('g').attr('class', 'tile').attr('transform', function (d) {
                return `translate(${(d.x - 1) * tileX}, ${(d.y - 1) * tileY})`;
            })
        )
        .style('cursor', 'pointer')
        .on('click', function (d) {
            showToolTip(this.__data__);
        });

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

            if (d.abbreviation === "L6dAltNAc" || d.abbreviation === "6dTalNAc") {
                d.group = "Deoxysugar-acetylated"
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