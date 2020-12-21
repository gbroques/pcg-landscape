const layerHeight = 300;
const layerWidth = window.innerWidth;

// properties of the base curve
let amplitude = Math.random() * (layerHeight / 2); // height of the curves
let freq = Math.random() * 0.02 + .005; // how far apart the peaks are
let phase = Math.random() * 250; // move the curve left / right

// properties of the interfering curve (for variation)
let freq2 = Math.random() * 0.01 + .005;
let phase2 = phase + (Math.random() * 175);

// draw the curve
let coord = `M 0 ${layerHeight} `;
for (let i=0; i<layerWidth + 1; i++) {
    coord += `H ${i} V ${
        (Math.sin(freq*(i + phase)) * amplitude) // base curve
        + (Math.sin(freq2*(i + phase2)) * amplitude / 2) // interfering curve
        + (layerHeight / 2) // offset by max height 
    }`;
}
coord += `V ${layerHeight} L 0 ${layerHeight}`;

// render the SVG
document.body.innerHTML = `<svg width="100%" height="${layerHeight}" view-box="0 0 ${layerWidth} 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${coord}"/>
</svg>`;