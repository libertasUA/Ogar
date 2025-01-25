const Cell = require('./Cell');

class SuperFood extends Cell {
    constructor(server, owner, position, size) {
        super(server, owner, position, size);
        this.type = 4;
        this.color = { r: 0xff, g: 0x00, b: 0x00 };
        this.overrideReuse = false;
    }

    onEaten(cell) {
        if (!cell.owner)
            return;

        return cell.setSize(cell.radius * 2);
    }
    onAdd(server) {
        server.nodesSyperFood.push(this);
    }
    onRemove(server) {
        server.nodesSyperFood.removeUnsorted(this);
        if (!this.overrideReuse) server.spawnFood();
    }
}

module.exports = SuperFood;
