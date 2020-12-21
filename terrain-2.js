const Color = require("color");

const offsetY = 160;
const layerHeight = 190;
const layerWidth = 600;
const baseColor = Color("#457cd6");
const layers = 5;

let paths = [];

for (let layer=1; layer<=layers; layer++) {
    let layerAnchorY = layer * (layerHeight / layers) + offsetY;
    let coord = `M 0 ${layerAnchorY} `;

    // back layers have higher peaks for more mountainous effect
    let amplitude = (Math.random() * (layerHeight / layers)) + (layerHeight / layer / layers);  
    let freq1 = (Math.random() * 0.02 * layer / layers) + .005;
    let freq2 = Math.random() * 0.01 + .005;
    let phase1 = Math.random() * 500;
    let phase2 = phase1 + (Math.random() * 250);

    for (let i=0; i<layerWidth + 1; i++) {
        coord += `H ${i} V ${
            (Math.sin(freq1*(i + phase1)) * amplitude) + // base
            (Math.sin(freq2*(i + phase2)) * amplitude / 2) + // interference
            (layerAnchorY - layerHeight)
        } `;
    }

    coord += `V ${layerAnchorY} L 0 ${layerAnchorY}`;
    paths.push(`<path d="${coord}" fill="${baseColor.saturate((layer / layers) / 2.5).darken((layer / layers)).string()}"/>`);
}

document.body.innerHTML = `<svg width="100%" height="300" viewBox="${`0 0 ${layerWidth} 100`}" xmlns="http://www.w3.org/2000/svg">
    ${paths}
</svg>`;