class HandleEvent {
    constructor(minLeft,maxLeft,itemWidth,index) {
        this.minLeft = minLeft;
        this.maxLeft = maxLeft;
        this.itemWidth = itemWidth;
        this.index = index;

        this.left = maxLeft;
        this.originalOffset = 0;
        this.velocity = 0;
        this.timeOfLastDragEvent = 0;
        this.touchStartX = 0;
        this.prevTouchX = 0;
        this.beingTouched = false;
    }
    
    start(x) {
        this.originalOffset = this.left;
        this.velocity = 0;
        this.timeOfLastDragEvent = Date.now();
        this.touchStartX = x;
        this.beingTouched = true;
    }
        
    move(x) {
        if (this.beingTouched) {
            const touchX = x;
            const currTime = Date.now();
            const elapsed = currTime - this.timeOfLastDragEvent;
            const velocity = this._calcVelocity(touchX);                        
            this.left = this._calcLeft(touchX);            
            this.index = this._calcIndex(touchX,velocity);
            this.velocity = velocity;            
            this.timeOfLastDragEvent = currTime;
            this.prevTouchX = touchX;            
        }
    }
        
    end() {        
        this.touchStartX = 0;
        this.beingTouched = false;        
        this.left = (this.index * this.itemWidth * (-1)) + this.maxLeft;
    }

    _calcLeft(touchX) {
        let deltaX = touchX - this.touchStartX + this.originalOffset;
        if (deltaX < this.minLeft) {
            deltaX = this.minLeft;
        } else if (deltaX > this.maxLeft) {
            deltaX = this.maxLeft;
        } 

        return deltaX;
    }

    _calcVelocity(touchX) {                
        const currTime = Date.now();
        const elapsed = currTime - this.timeOfLastDragEvent;
        const velocity = 20 * (touchX - this.prevTouchX) / elapsed;
        return velocity;
    }

    _calcIndex(touchX,velocity) {
        let index = Math.round(Math.abs(this.left / this.itemWidth));
        let size = Math.abs(touchX - this.prevTouchX);
        let bonus = 0;
        if (size < this.itemWidth) {
            if (velocity < 0) {
                bonus = 1;
            }
        }
        return index + bonus;
    }
}

export default HandleEvent;