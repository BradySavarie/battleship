export class Ship {
    constructor(
        readonly length: number,
        readonly name: string,
        public hits: number = 0,
        public orientation: string = 'horizontal',
        public isPlaced: boolean = false
    ) {
        this.length = length;
        this.name = name;
        this.hits = hits;
        this.orientation = orientation;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length ? true : false;
    }

    changeOrientation() {
        this.orientation =
            this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
    }
}
