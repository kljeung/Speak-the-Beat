export default class LevelMapCamera extends Phaser.Scene {
    constructor() {
        super("LevelMapCamera");
        this.scrollActive = true;
        this.scrollSpeed = 0.5; // adjust to change speed
        this.scaleFactor = 1.9;
    }

    create() {
        // loads 2 copies of the same map, so they connect smoothly
        this.mapA = this.make.tilemap({ key: "levelMap" });
        this.mapB = this.make.tilemap({ key: "levelMap" });

        const tilesetA = this.mapA.addTilesetImage("tilemap_packed", "tiles");
        const tilesetB = this.mapB.addTilesetImage("tilemap_packed", "tiles");

        // initial offsets
        const offsetY = 0;
        const offsetXA = 0;
        const offsetXB = this.mapA.widthInPixels;

        // dupes layer set
        this.layersA = this.createLayerSet(this.mapA, tilesetA, offsetXA, offsetY);
        this.layersB = this.createLayerSet(this.mapB, tilesetB, offsetXB, offsetY);

        for (let layer of [...this.layersA, ...this.layersB]) {
            layer.setDepth(-10);
        }

        this.mapWidth = this.mapA.widthInPixels * this.scaleFactor;

        // could be used to stop background
        this.events.on("stop-background", () => {
            this.scrollActive = false;
            for (let layer of [...this.layersA, ...this.layersB]) {
                layer.setVisible(false);
            }
        });

        this.scene.launch("Game");
        this.scene.launch("Face");
    }

    createLayerSet(map, tileset, offsetX, offsetY) {
        const groundLayer = map.createLayer("Ground", tileset, offsetX, offsetY);
        const decorLayer = map.createLayer("Decor", tileset, offsetX, offsetY);

        groundLayer.setScale(this.scaleFactor);
        decorLayer.setScale(this.scaleFactor);

        return [groundLayer, decorLayer];
    }

    update() {
        if (this.scrollActive) {
            this.scrollLayers(this.layersA);
            this.scrollLayers(this.layersB);
        }
    }

    scrollLayers(layers) {
        for (let layer of layers) {
            layer.x -= this.scrollSpeed;

            // if the image fully exits left, the right image will follow
            if (layer.x <= -this.mapWidth) {
                layer.x += this.mapWidth * 2;
            }
        }
    }
}
