# :octocat: mario Bros Lvl 1

<img src="https://img.shields.io/badge/made%20with-phaser-blue.svg" alt="made with phaser"> <img src="https://img.shields.io/badge/made%20with-vanillajs-yellow.svg" alt="made with vanilla-js"> <img src="https://img.shields.io/github/last-commit/jugshaurya/mario" alt="last-commit"> <img src="https://img.shields.io/github/languages/code-size/jugshaurya/mario" alt="code-size">

## Resources

https://www.valentinog.com/blog/webpack/

What Is Webpack? - Module Builder
What Is Babel? Transpiler
Webpack takes all of your various project files, creates static assets, and Babel then transpiles those files for the vast majority of browsers to read.

## Setup

Webpack4
babel7 means for evry dependies there is a @ in front @babel/

npm init
npm install webpack webpack-cli webpack-dev-server --save-dev
npm install @babel/cli @babel/core @babel/node @babel/preset-env @babel/register --save-dev
JS/JSX & CSS Loaders and plugin:

---

npm install babel-loader html-loader style-loader css-loader html-webpack-plugin mini-css-extract-plugin --save-dev

## plugin

## add a .babelrc file with code:

{
"presets": [
"@babel/preset-env",
]
}

add a file named webpack.config.js and see code in that file

add scripts in package.json
"scripts": {
"start": "webpack-dev-server --mode development --open",
"dev": "webpack --mode development",
"build": "webpack --mode production"
},

## Added copy-webpack-plugin for assets

Bootscenes
GameScene

Made level with tiled app in JSON format with tile-gutter from internet

## Adding Mario

## ADDing level

```
	function preload(){
		this.load.image('gameTiles', 'tiles_spritesheet.png');
		this.load.tilemapTiledJSON﻿('level1', 'map.json');
	}

	function create(){
		this.map = this.add.tilemap('level1');
		var tileset = this.map.addTilesetImage('tiles_spritesheet','gameTiles');
		this.backgroundLayer = this.map.createLayer('backgroundLayer', tileset);
}
```

## Run it

```
npm start
```
