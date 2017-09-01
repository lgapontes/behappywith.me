class HandleEvent {
    constructor(minLeft,maxLeft,itemWidth,index,minIndex,exclusiveMaxIndex) {
        this.minLeft = minLeft;
        this.maxLeft = maxLeft;
        this.itemWidth = itemWidth;
        this.index = index;
        this.minIndex = minIndex;
        this.exclusiveMaxIndex = exclusiveMaxIndex;
        this.direction = 0;

        this.left = maxLeft;
        this.originalOffset = 0;
        this.velocity = 0;
        this.timeOfLastDragEvent = 0;
        this.touchStartX = 0;
        this.prevTouchX = 0;
        this.beingTouched = false;        
    }

    setIndex(index) {        
        if ((index >= this.minIndex) && (index < this.exclusiveMaxIndex)) {
            this.index = index;
        }        
    }
    
    start(x) {        
        this.direction = 0;
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
            this._calcIndex(touchX,velocity);
            this._calcDirection(touchX);
            this.velocity = velocity;            
            this.timeOfLastDragEvent = currTime;
            this.prevTouchX = touchX;            
        }
    }
        
    end() {        
        this.touchStartX = 0;
        this.beingTouched = false;
        this._safeDirection();    
        this.left = (this.index * this.itemWidth * (-1)) + this.maxLeft;
    }

    _calcVelocity(touchX) {                
        const currTime = Date.now();
        const elapsed = currTime - this.timeOfLastDragEvent;
        const velocity = 20 * (touchX - this.prevTouchX) / elapsed;
        return velocity;
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

    _calcIndex(touchX,velocity) {        
        let index = Math.round(
            Math.abs(
                (this.left - this.maxLeft) / this.itemWidth
            )
        );

        let size = Math.abs(touchX - this.prevTouchX);        

        let bonus = 0;
        if (size < this.itemWidth) {
            //bonus = this.direction * (-1);
            
            if (velocity < 0) {
                bonus = 1;
            } else {
                bonus = -1;
            }            
        }
        this.setIndex( index + bonus );
    }

    _calcDirection(touchX) {
        if (touchX > this.prevTouchX) {
            this.direction = 1;
        } else if (touchX < this.prevTouchX) {
            this.direction = -1;
        } else {
            this.direction = 0;
        }
    }

    _safeDirection() {
        if (
            this.index == 1 && 
            this.direction == 1 && 
            this.left == this.maxLeft
        ) {
            this.index = 0;
        }

        if (
            this.index == (this.exclusiveMaxIndex - 2) &&
            this.direction == -1 &&
            Math.sign(this.left) == -1)
        {
            this.index = (this.exclusiveMaxIndex - 1);
        }
    }
}

export default HandleEvent;