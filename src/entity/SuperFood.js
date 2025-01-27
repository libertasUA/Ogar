const Cell = require('./Cell');
const BinaryWriter = require(".././packet/BinaryWriter");

class SuperFood extends Cell {
    constructor(server, owner, position, size, skin) {
        super(server, owner, position, size);
        this.type = 4;
        this.color = { r: 0xff, g: 0x00, b: 0x00 };
        this.overrideReuse = false;
        this._skin = skin;
        this._skinUtf8 = null;
    }

    setSkin() {
        var writer = new BinaryWriter();
        writer.writeStringZeroUtf8(this._skin);
        this._skinUtf8 = writer.toBuffer();
    }

    onEaten(cell) {
        if (!cell.owner)
            return;

        return cell.setSize(cell.radius * 2);
    }
    onAdd(server) {
        this.setSkin();
        server.nodesSyperFood.push(this);
        
    }
    onRemove(server) {
        server.nodesSyperFood.removeUnsorted(this);
        if (!this.overrideReuse) server.spawnFood();
    }
}

module.exports = SuperFood;
