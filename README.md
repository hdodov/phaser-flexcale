# What is phaser-flexcale?
It's a Phaser plugin that allows games to be responsive without black bars. It also provides the opportunity to specify resolution.

# How it works
You provide flexcale with a `minWidth` and `minHeight` values. They represent your desired game resolution. If the browser window is smaller or larger, flexcale dispatches a signal with a scale value that your game content must have in order to fit.

You can optionally provide a `maxWidth` and `maxHeight` values. With them, you can set a maximum size of the game, in case you don't want it to always be as big as its container.

A `resolution` option is also available. If you set that to `0.5`, the game canvas will be half as big, but CSS transform with value `scale(2)` would be applied to it. This reduces the amount of pixels rendered while the game still fits the screen. It can drastically increase performance as well, so you can provide it as a setting in your game for players with slower devices.

# Example
![phaser-flexcale in action](https://media.giphy.com/media/pakgPBvYFO9BC/giphy.gif)

In this GIF, green represents the places where you would normally see black bars. With flexcale, this is now a part of your game and it can be something other than black. Red represents your game's main content. You will rescale and reposition it based on a value that flexcale provides. Black is the background color of the web page containing the demo. You can't see much black.

As you can see, you can also dynamically increase/decrease the resolution of your game.

Check the demo [here](https://phaser-flexcale.netlify.com/).

## How the example works
In the `preload()`, I initialize and properly set the options for flexcale:

```js
game.flexcale = game.plugins.add(Phaser.Plugin.Flexcale);
game.flexcale.setOptions({
    minWidth: 480,
    minHeight: 720
});
```

In `create()`, I make a graphics object that represents my game's content:

```js
var graphics = game.add.graphics(0, 0);
graphics.beginFill(0xff0000);
graphics.drawRect(0, 0, 480, 720);
graphics.endFill();
```

Notice that it's as big as the `minWidth` and `minHeight` properties for flexcale. I recommend doing the same thing in your game - have some sort of container that has your desired size and add your content to it as a child. Then, simply position and rescale that container. Your content will do the same.

Finally, I attach an event listener to flexcale's `onResize` event that rescales my game content accordingly:

```js
game.flexcale.onResize.add(function (scale) {
    graphics.scale.setTo(scale);
    graphics.alignIn(game.world, Phaser.CENTER);
});
```

# Warning!
Currently flexcale needs to modify the CSS of the game's parent container in order to work correctly. It sets its `width` and `height` CSS properties to `100%` and modifies its `margin-left` and `margin-right` when needed in order to center the game.
For an _actual_ container, wrap the game in another `<div>`. This is due to Phaser manipulating the game canvas' `margin` properties, making it impossible to change them. Thus, the parent container must be used.

**This may be fixed if there's a solution!**

# License
MIT
