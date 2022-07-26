class Calculator {
    constructor(previoustext, currenttext) {
        this.previoustext = previoustext
        this.currenttext = currenttext
        this.clear()
    }


    clear() {
        this.currentoperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }



    delete() {
        this.currentoperand = this.currentoperand.toString().slice(0, -1)
    }


    appendNumber(number) {
        if (number === "." && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + number.toString()
    }


    chooseoperation(operation) {
        if (this.currentoperand === '') return
        if (this.previousoperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousoperand = this.currentoperand
        this.currentoperand = ''
    }


    compute() {
        let computation
        const prev = parseFloat(this.previousoperand)
        const curr = parseFloat(this.currentoperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break            
            case '-':
                computation = prev - curr
                break                
            case '/':
                    computation = prev / curr
                    break
            case '*':
                computation = prev * curr
                break    
            default :
                return    
        }

        this.currentoperand = computation
        this.operation = undefined
        this.previousoperand = ''
    }


    getDisplayNumber(number){
        const stringnum = number.toString()
        const integerdigits = parseFloat(stringnum.split('.')[0])
        const decimaldigits = stringnum.split('.')[1]
        let intdisplay 
        if(isNaN(integerdigits)){
            intdisplay = ''
        } else{
            intdisplay = integerdigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimaldigits != null) {
            return `${intdisplay}.${decimaldigits}`
        } else{
            return intdisplay
        }
    }


    updateDisplay() {
        this.currenttext.innerText = this.getDisplayNumber(this.currentoperand)
        if(this.operation != null){
            this.previoustext.innerText = 
            `${this.getDisplayNumber(this.previousoperand)} ${this.operation}`
        } else{
            this.previoustext.innerText = ''
        }
    }


}


const numbtn = document.querySelectorAll('[data-number]')
const opbtn = document.querySelectorAll('[data-operation]')
const clearbtn = document.querySelector('[data-AC]')
const equalbtn = document.querySelector('[data-equals]')
const delbtn = document.querySelector('[data-delete]')
const previoustext = document.querySelector('[data-previous-operand]')
const currenttext = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previoustext, currenttext)

numbtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

opbtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseoperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalbtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearbtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delbtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})