export class Ship {
    constructor(
        readonly length: number,
        public hits: number = 0,
        public orientation: string = 'horizontal'
    ) {
        this.length = length;
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
        if (this.orientation === 'horizontal') {
            this.orientation = 'vertical';
        } else {
            this.orientation = 'horizontal';
        }
    }
}
