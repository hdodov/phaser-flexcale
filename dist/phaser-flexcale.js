Phaser.Plugin.Flexcale = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);

	this.options = {
		resolution: 1,
		centering: true,
		upscaling: true,
		minWidth: 480,
		minHeight: 720,
		maxWidth: null,
		maxHeight: null
	};

	this.parent = document.getElementById(this.game.parent);
	this.parent.style.width = "100%";
	this.parent.style.height = "100%";

	this.scale = 1;
	this.onResize = new Phaser.Signal();

	this.game.scale.scaleMode = Phaser.ScaleManager.HEADLESS;

	var that = this;
	window.addEventListener("resize", function () {
		that.resize();
	});

	this.game.input.scale.setTo = function () {
		Phaser.Point.prototype.setTo.apply(this, arguments);
		this.x *= that.options.resolution;
		this.y *= that.options.resolution;
	};
};

Phaser.Plugin.Flexcale.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.Flexcale.prototype.constructor = Phaser.Plugin.SamplePlugin;

Phaser.Plugin.Flexcale.prototype.setOptions = function (object, silent) {
	for (var k in object) {
		this.options[k] = object[k];
	}

	if (silent !== true) {
		this.resize();
	}
};

Phaser.Plugin.Flexcale.prototype.resize = function () {
	var o = this.options,
		w = this.parent.offsetWidth,
		h = this.parent.offsetHeight,
		wRatio = (w / o.minWidth), // portion of the minimal width available
		hRatio = (h / o.minHeight); // portion of the minimal height available

	this.scale = (wRatio < hRatio) ? wRatio : hRatio;
	if (this.scale > 1 && !o.upscaling) {
		this.scale = 1;
	}

	if (typeof o.maxWidth === "number") {
		w = Math.min(w, o.maxWidth * this.scale);
	}

	if (typeof o.maxHeight === "number") {
		h = Math.min(h, o.maxHeight * this.scale);
	}

	w *= o.resolution;
	h *= o.resolution;
	this.scale *= o.resolution;

	this.game.scale.setGameSize(w, h);

	this.cssTransform(this.game.canvas, "scale(" + (1 / o.resolution) + ")", "center center");
	if (o.centering) {
		this.parent.style.marginLeft = ((this.parent.offsetWidth - w) / 2) + "px";
		this.parent.style.marginTop = ((this.parent.offsetHeight - h) / 2) + "px";
	}

	this.onResize.dispatch(this.scale);
};

Phaser.Plugin.Flexcale.prototype.cssTransform = function (elem, value, origin) {
	if (!elem || !elem.style) {
		return;
	}

	elem.style.webkitTransform = value;
	elem.style.MozTransform = value;
	elem.style.msTransform = value;
	elem.style.OTransform = value;
	elem.style.transform = value;

	elem.style.webkitTransformOrigin = origin;
	elem.style.MozTransformOrigin = origin;
	elem.style.msTransformOrigin = origin;
	elem.style.transformOrigin = origin;
};