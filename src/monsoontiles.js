let windowDoneResize = false
class MoonsoonGrid{
    constructor(parentGrid,elements,verticalMargin){
        //Essential Variables
        this.grid = parentGrid
        this.element = elements
        this.verticalMargin = verticalMargin
        //Essential Styles
        this.gridWidth = this.grid.getBoundingClientRect().width
        this.columns = parseInt((this.gridWidth / this.element[0].getBoundingClientRect().width), 10)
        this.gridStyles = this.grid.getBoundingClientRect()
        //Heights of the elements
        this.elementHeight = Array()
        this.elementHeightRecalculated = Array()
        this.calculate()

    }

    //Set Element Height
    setElementHeight() {
        for(let loopCounter = 0; loopCounter < this.element.length; loopCounter++){
            let tempElementHeight = this.element[loopCounter].getBoundingClientRect().height
            this.elementHeight.push(tempElementHeight)
        }
    }

    //Move Elements to the top (0) of the parent
    setElementTopZero(){
        for(let loopCounter = 0; loopCounter < this.element.length; loopCounter++){
            let tempElement = this.element[loopCounter]
            let tempElementComputed = tempElement.getBoundingClientRect()
            if(loopCounter >= this.columns){
                gsap.set(tempElement,{
                    top:"-"+(tempElementComputed.top - this.gridStyles.top),
                })
            }
        }
    
    }

    //Recalaculate Element Height (Set Element Height Recalculated)
    recalaculateElementHeight(){
        //Relcalculate the heights of all elements
        for(let loopCounter = 0; loopCounter < this.elementHeight.length; loopCounter++){
            let tempLoopCounter = loopCounter - this.columns
            let tempHeight = 0;
            while(tempLoopCounter > 0){
                tempHeight = tempHeight + this.elementHeight[tempLoopCounter] + this.verticalMargin
                tempLoopCounter = tempLoopCounter - this.columns
            }
            this.elementHeightRecalculated.push(tempHeight)
        }
        
        //Refine Calculations on the first column
        /**Due to forces unkwon elements on the first column are usuall not well alaigned thus the need for this function */

        for(let loopCounter = 0; loopCounter < this.elementHeightRecalculated.length; loopCounter = loopCounter + this.columns ){
            if (loopCounter  > 0){
                this.elementHeightRecalculated[loopCounter] = this.elementHeightRecalculated[loopCounter] + this.elementHeight[0]+this.verticalMargin 
            }
        }
    }

    //Set new calculated heights to the various elements
    setNewElementPosition(){
        for(let loopCounter = 0; loopCounter < this.element.length; loopCounter++){
            let offsetHeight = this.gridStyles.top - this.elementHeightRecalculated[loopCounter]
            if(loopCounter > this.columns - 1){
                gsap.to(this.element[loopCounter],{
                    y:this.elementHeightRecalculated[loopCounter]
                    
                })
            }
        }
    }

    //Run trough all methods
    calculate(){
        this.setElementHeight()
        this.setElementTopZero()
        this.recalaculateElementHeight()
        this.setNewElementPosition()
    }



}


