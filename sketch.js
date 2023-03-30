
const canvasW = 2500;
const canvasH = 1000;

let midX;
let midY;

function setup() {
    // Canvas
    midX = canvasW / 2;
    midY = canvasH / 2;

    let canvas = createCanvas(canvasW, canvasH);

    canvas.position(
        window.innerWidth / 2 - midX,
        window.innerHeight / 2 - midY
    );

    // Background
    background(0);

    // Stars
    createStars();

    // Planets
    const nrPlanets = 5

    for (let p = 0; p < nrPlanets; p++) {
        let separation = (canvasW - 750) / (nrPlanets - 1);
        let posX = separation * p + 375;
        let size = random(75, 400);

        createPlanet(posX, midY, size, size);
    }
}

function createStars() {
    noStroke();
    fill(255);

    for (let s = 0; s < 200; s++) {
        let x = random(0, canvasW);
        let y = random(0, canvasH);
        let size = random(2, 5);

        ellipse(x, y, size, size);
    }
}

function createPlanet(x, y, width, height) {
    fill(255);
    stroke(255);
    strokeWeight(width / 20);
    ellipse(x, y, width, height);

    drawingContext.save();
    drawingContext.clip();

    let planetType = random();

    if (planetType < 0.4) {
        createStripes(x, y, width, height);
    } else if (planetType < 0.8) {
        createStripes(x, y, width, height);
        createSpots(x, y, width, height);
    } else {
        createSpots(x, y, width, height);
    }

    drawingContext.restore();
}

function createStripes(x, y, width, height) {
    let minStripeHeight = random(1, height / 50);
    let maxStripeHeight = minStripeHeight + height / 10;
    let stripeChance = random(0.2, 0.8);

    for (let h = 0; h < height; h += 20) {
        if (random() < stripeChance) {
            let stripeY = h + y - height / 2;
            let stripeHeight = random(minStripeHeight, maxStripeHeight);

            stroke(0);
            strokeWeight(stripeHeight);
            noFill();
            line(x - width / 2, stripeY, x + width / 2, stripeY);
        }
    }
}

function createSpots(x, y, width, height) {
    for (let h = 0; h < height; h += height / 30) {
        if (random() < 0.33) {
            let spotX = random(x - width / 2, x + width / 2);
            let spotY = h + y - height / 2;
            let spotColor = random(0, 1) < 0.5 ? 0 : 255;
            let spotSize = random(height / 50, height / 5);

            noStroke();
            fill(spotColor);
            ellipse(spotX, spotY, spotSize, spotSize);
        }
    }
}
