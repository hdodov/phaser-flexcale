var game = new Phaser.Game({
	width: "100",
	height: "100",
	parent: "game-holder",
	state: this
});

function preload() {
	game.stage.backgroundColor = "#00ff00";

	game.flexcale = game.plugins.add(Phaser.Plugin.Flexcale);
	game.flexcale.setOptions({
		minWidth: 480,
		minHeight: 720
	});
}

function create() {
	game.add.text(10, 10, "Game Background", {fill: "#ffffff"});

	var graphics = game.add.graphics(0, 0);
	graphics.beginFill(0xff0000);
	graphics.drawRect(0, 0, 480, 720);
	graphics.endFill();

	var content = game.add.text(10, 10, "Game Content", {fill: "#ffffff"});
	var res = game.add.text(10, 60, "");

	var resUp = game.add.text(10, 90, "increase");
	resUp.inputEnabled = true;
	resUp.events.onInputDown.add(function () {
		game.flexcale.setOptions({
			resolution: game.flexcale.options.resolution + 0.1
		});
	});

	var resDown = game.add.text(10, 120, "decrease");
	resDown.inputEnabled = true;
	resDown.events.onInputDown.add(function () {
		game.flexcale.setOptions({
			resolution: game.flexcale.options.resolution - 0.1
		});
	});

	graphics.addChild(content);
	graphics.addChild(res);
	graphics.addChild(resUp);
	graphics.addChild(resDown);

	game.flexcale.onResize.add(function (scale) {
		res.setText("resolution: " + game.flexcale.options.resolution);
		graphics.scale.setTo(scale);
		graphics.alignIn(game.world, Phaser.CENTER);
	});

	game.flexcale.resize();
}