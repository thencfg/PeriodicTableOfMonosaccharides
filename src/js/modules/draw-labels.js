import * as d3 from 'd3';
import { getXYRange } from './getXYRange.js';

/**
 * Draws labels for the periodic table elements.
 * @param {any} element - The SVG element to append the labels to.
 * @param {Array} blockData - The data for the block of elements.
 * @param {number} tileX - The width of each tile in the periodic table.
 * @param {number} tileY - The height of each tile in the periodic table.
 * @param {string} block - The block of elements ('a', 'b', 'c', etc.).
 * @returns {void}
 */
export function drawLabels(element, blockData, tileX, tileY, block) {
    let periodG = element.append('g').attr('id', 'period-labels');
    let groupG = element.append('g').attr('id', 'group-labels');

    let groups = getXYRange(blockData, 'group');
    let periods = getXYRange(blockData, 'period');

    if (block == 'a') {
        for (let group in groups) {
            groupLabel(groupG, group, groups[group], tileX)
        }

        let translateX = d3.max(blockData, d => d.x) * tileX;

        for (let period in periods) {
            rightSidePeriodBars(periodG, period, periods[period], tileY, translateX)
        }
    }

    for (let period in periods) {
        periodLabel(periodG, period, periods[period], tileY)
    }

}


/**
 * Produces the label for periods / rows such as triose, tetrose
 * @param {any} periodG
 * @param {any} period
 * @param {any} details
 * @param {any} tileY
 * @returns {any}
 */
function periodLabel(periodG, period, details, tileY) {
    let y = tileY * (((details.maxY - details.minY) / 2) + details.minY) - tileY
    let labelG = periodG.append('g').attr('transform', `translate(-10 , ${y})`)
    labelG.append('text').text(period).attr('text-anchor', 'end')
        .attr('transform', `translate(-10, ${tileY / 2})`)

    let periodLength = details.maxY - details.minY + 0.9;

    labelG.append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', (-periodLength * (tileY / 2) + tileY / 2))
        .attr('y2', (periodLength * (tileY / 2)) + tileY / 2)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)

    labelG.append('line')
        .attr('x1', 0)
        .attr('x2', 5)
        .attr('y1', (-periodLength * (tileY / 2) + tileY / 2))
        .attr('y2', (-periodLength * (tileY / 2) + tileY / 2))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)

    labelG.append('line')
        .attr('x1', 0)
        .attr('x2', 5)
        .attr('y1', (periodLength * (tileY / 2)) + tileY / 2)
        .attr('y2', (periodLength * (tileY / 2)) + tileY / 2)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
}

function rightSidePeriodBars(periodG, period, details, tileY, translateX) {
    let y = tileY * (((details.maxY - details.minY) / 2) + details.minY) - tileY
    let labelG = periodG.append('g').attr('transform', `translate(${translateX} , ${y})`)

    let periodLength = details.maxY - details.minY + 0.9;

    labelG.append('line')
        .attr('x1', 10)
        .attr('x2', 10)
        .attr('y1', (-periodLength * (tileY / 2) + tileY / 2))
        .attr('y2', (periodLength * (tileY / 2)) + tileY / 2)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)

    labelG.append('line')
        .attr('x1', 10)
        .attr('x2', 5)
        .attr('y1', (-periodLength * (tileY / 2) + tileY / 2))
        .attr('y2', (-periodLength * (tileY / 2) + tileY / 2))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)

    labelG.append('line')
        .attr('x1', 10)
        .attr('x2', 5)
        .attr('y1', (periodLength * (tileY / 2)) + tileY / 2)
        .attr('y2', (periodLength * (tileY / 2)) + tileY / 2)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
}


/**
 * Produces the label for groups / columns such as Aldose, Ketose
 * @param {any} groupG
 * @param {any} group
 * @param {any} details
 * @param {any} tileX
 * @returns {any}
 */
function groupLabel(groupG, group, details, tileX) {
    let x = tileX * (((details.maxX - details.minX) / 2) + details.minX) - tileX
    let labelG = groupG.append('g').attr('transform', `translate(${x} , -10)`)
    labelG.append('text').text(group).attr('text-anchor', 'middle')
        .attr('transform', `translate(${tileX / 2}, -20)`)

    let groupLength = details.maxX - details.minX + 0.9;

    labelG.append('line')
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('x1', (-groupLength * (tileX / 2) + tileX / 2))
        .attr('x2', (groupLength * (tileX / 2)) + tileX / 2)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)

    labelG.append('line')
        .attr('y1', 0)
        .attr('y2', 5)
        .attr('x1', (-groupLength * (tileX / 2) + tileX / 2))
        .attr('x2', (-groupLength * (tileX / 2) + tileX / 2))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)

    labelG.append('line')
        .attr('y1', 0)
        .attr('y2', 5)
        .attr('x1', (groupLength * (tileX / 2)) + tileX / 2)
        .attr('x2', (groupLength * (tileX / 2)) + tileX / 2)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
}