var stage = new createjs.Stage('game');
var ground = new createjs.Shape();
var graphics = ground.graphics;
var lander = new createjs.Shape();
var velocity = 0; // Initial velocity of landing craft
var fuel = 10; // Amount of fuel of landing craft
var fuelWarning = false; // Flash when no fuel
var fuelTicker = 30; // Duration of flash (Half of FPS)
var accelerating = false; // Is left mouse button held down?
var running = true; // Is game running?

graphics.beginFill('#00ff00'); // Colours landing zone green
graphics.drawRect(0, 90, 500, 90); // Size of landing zone
stage.addChild(ground);

graphics = lander.graphics;
graphics.beginStroke('#00ff00').beginFill('#000'); // Colours lander outline green
graphics.moveTo(8, 12).lineTo(5, 9).lineTo(5, 5).lineTo(8, 2).lineTo(12, 2).lineTo(15, 5).lineTo(15, 9).lineTo(12, 12);
graphics.drawRect(4, 12, 4, 7).drawRect(8, 12, 4, 7).drawRect(12, 12, 4, 7);
graphics.moveTo(6, 19).lineTo(1, 24).moveTo(-2, 25).lineTo(4, 25);
graphics.moveTo(14, 19).lineTo(19, 24).moveTo(16, 25).lineTo(22, 25);
lander.x = 245; // Positions lander
stage.addChild(lander);

function tick() {
    if (running === true) {
        if (lander.y < 64) {
            velocity = velocity + (1.622 / 60) - (0.1 / (fuel > 5 ? fuel : 5));
            if (accelerating === true && fuel > 0) {
                velocity = velocity - 0.05 + (-0.25 / (fuel > 5 ? fuel : 5));
                fuel = fuel - 1;
                flame.visible = true;
            } else {
                flame.visible = false;
            }

            velocityLabel.text = 'VELOCITY: ' + velocity.toFixed(2) + 'm/s';
            fuelLabel.text = 'FUEL: ' + fuel;

            if (fuel === 0 && fuelWarning === false) {
                fuelLabel.text = 'FUEL:  ';
                fuelTicker--;
                if (fuelTicker === 0) {
                    fuelWarning = true;
                    fuelTicker = 30;
                }
            } else if (fuel === 0 && fuelWarning === true) {
                fuelLabel.text = 'FUEL: ' + fuel;
                fuelTicker--;
                if (fuelTicker === 0) {
                    fuelWarning = false;
                    fuelTicker = 30;
                }
            }

            lander.y = lander.y + velocity;
            flame.y = lander.y + 10;
        } else {
            if (velocity <= 0.5) {
                resultLabel.text = 'YOU LANDED!';
            } else {
                resultLabel.text = 'YOU CRASHED!';
                fuelLabel.text = 'FUEL: ' + fuel; // Force fuel to be shown if currently ticked off
            }
            running = false;
        }
    }
}

createjs.Ticker.addEventListener('tick', tick);
createjs.Ticker.addEventListener('tick', stage);
createjs.Ticker.setFPS(60);

document.addEventListener('mousedown', function () {
    accelerating = true;
});
document.addEventListener('mouseup', function () {
    accelerating = false;
});

var resultLabel = new createjs.Text('');
resultLabel.font = 'normal 10px "Press Start 2P"';
resultLabel.color = '#00ff00';
resultLabel.textAlign = 'right';
//resultLabel.x = 195;  // Top center aligned
//resultLabel.y = 8;
resultLabel.x = 492; // Bottom right aligned
resultLabel.y = 72;
stage.addChild(resultLabel);

var velocityLabel = new createjs.Text('Velocity: 0m/s');
velocityLabel.font = 'normal 10px "Press Start 2P"';
velocityLabel.color = '#00ff00';
velocityLabel.x = 8;
velocityLabel.y = 8;
stage.addChild(velocityLabel);

var flame = new createjs.Shape();
g = flame.graphics;
g.beginStroke('#00ff00').beginFill('#00ff00');
g.moveTo(10, 10).lineTo(8, 12).lineTo(8, 14).lineTo(9, 16).lineTo(10, 17).lineTo(11, 16).lineTo(12, 14).lineTo(12, 12).lineTo(10, 10);
flame.x = 245;
flame.visible = false;
stage.addChild(flame);

var fuelLabel = new createjs.Text('Fuel: 200');
fuelLabel.font = 'normal 10px "Press Start 2P"';
fuelLabel.textAlign = 'right';
fuelLabel.color = '#00ff00';
fuelLabel.x = 492;
fuelLabel.y = 8;
stage.addChild(fuelLabel);