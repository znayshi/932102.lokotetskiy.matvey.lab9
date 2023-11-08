class Calculator {
    constructor() {
        this.inputEl = document.querySelector('.calculateInput input');
        this.buttonContainerEl = document.querySelector('.buttons');

        this.operationSymbols = ['+', '-', '*', '/'];
        this.equalSymbol = '=';
        this.backspaceSymbol = '<-';
        this.clearSymbol = 'C';
        this.dotSymbol = '.';

        this.buttonContainerEl.addEventListener('click', ($event) => {
            const clickedButton = $event.target;
            const inputValue = this.inputEl.value;

            if (clickedButton.classList.contains('calculateButton')) {
                const newSymbol = clickedButton.textContent;

                this.containsInvalidSymbols(inputValue) ? this.inputEl.value = '' : this.processCalculation(inputValue, newSymbol);
            }
        });
    }

    containsInvalidSymbols(inputValue) {
        return !((inputValue).match(/[0-9%\/*\-+=]/) || inputValue === '');
    }

    processCalculation(inputValue, newSymbol) {
        if (newSymbol === this.equalSymbol) {
            this.handleEqualOperation(inputValue);
        }
        else if (newSymbol === this.backspaceSymbol) {
            this.inputEl.value = inputValue.substring(0, inputValue.length - 1);
        }
        else if (newSymbol === this.clearSymbol) {
            this.inputEl.value = '';
        }
        else if (newSymbol === this.dotSymbol) {
            this.handleDotOperation(inputValue);
        }
        else {
            this.operationSymbols.includes(newSymbol) ? this.handleOperation(inputValue, newSymbol) : this.inputEl.value += newSymbol;
        }
    }

    handleEqualOperation(inputValue) {
        if (this.isLastSymbolOperation(inputValue) || this.isLastSymbolDot(inputValue)) {
            this.inputEl.value = inputValue.substring(0, inputValue.length - 1);
        }

        this.inputEl.value = eval(this.inputEl.value);
    }

    handleOperation(inputValue, newSymbol) {
        if (this.isFirstSymbolOperation(inputValue) && newSymbol !== '-') {
            this.inputEl.value = this.inputEl.value;
        } else if (this.isLastSymbolOperation(inputValue) || this.isLastSymbolDot(inputValue)) {
            this.inputEl.value = inputValue.substring(0, inputValue.length - 1) + newSymbol;
        }
        else {
            this.inputEl.value += newSymbol;
        }
    }

    handleDotOperation(inputValue) {
        if (this.isLastSymbolOperation(inputValue) || this.isLastSymbolDot(inputValue)) {
            return;
        }

        let dotsCount = 0;

        for (let i = inputValue.length - 1; i >= 0; i--) {
            if (inputValue[i] === this.dotSymbol) {
                dotsCount++;
            }

            if (this.operationSymbols.includes(inputValue[i])) {
                break;
            }
        }

        if (dotsCount !== 0) {
            this.inputEl.value = this.inputEl.value;
        } else {
            this.inputEl.value += this.dotSymbol;
        }
    }

    isFirstSymbolOperation(inputValue) {
        return inputValue.length === 0;
    }

    isLastSymbolOperation(inputValue) {
        const lastSymbol = inputValue.slice(inputValue.length - 1, inputValue.length);
        return this.operationSymbols.includes(lastSymbol);
    }

    isLastSymbolDot(inputValue) {
        const lastSymbol = inputValue.slice(inputValue.length - 1, inputValue.length);
        return '.' === lastSymbol;
    }
}

const calculator = new Calculator();
