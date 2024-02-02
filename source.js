class Calculator{
    #num1String = "";
    #num2String = "";
    #result = "";
    #deci = false;
    #operator = "";
    #divideByZeroMessage = "No dividing for you";
    constructor() {
        
    }

    setOperator(op){
        if(this.#result == this.#divideByZeroMessage){
            return;
        }
        if(this.#operator!="" && this.#num2String!=""){
            this.operate();
        }
        this.#operator = op;
    }

    setNumber(digit){
        if(this.#operator==""){
            if(this.#num1String.indexOf(".")!=-1 && digit=="."){return;}
            if(digit == "." && this.#num1String == ""){
                if(this.#result.indexOf(".")!=-1){
                    return;
                }
                this.#num1String = this.#result;
            }
            this.#num1String = this.#num1String==""&&digit=="." ? "0." :  this.#num1String + digit;
            this.setDisplay(this.#num1String);
            if(this.#result!=""){
                this.#result = "";
            }
        }
        else{
            if(this.#num2String.indexOf(".")!=-1 && digit=="."){return;}
            this.#num2String = this.#num2String==""&&digit=="." ? "0." :  this.#num2String + digit;
            this.setDisplay(this.#num2String);
        }
        
    }

    clear(){
        this.#num1String = "";
        this.#num2String = "";
        this.#result = "";
        this.#deci = false;
        this.#operator = "";
        this.setDisplay("0");
    }


    operate(){
        if(this.#operator==""){
            return;
        }
        if(this.#result != ""){
            this.#num1String = this.#result;
        }
        if(this.#num2String == ""){
            this.#num2String = this.#num1String;
        }
        if(this.#num1String == ""){
            this.#num1String = "0";
        }

        let num1 = this.#deci==false ? Number.parseInt(this.#num1String,10) : Number.parseFloat(this.#num1String);
        let num2 = this.#deci==false ? Number.parseInt(this.#num2String,10) : Number.parseFloat(this.#num2String);
        switch(this.#operator){
            case "+":
                this.#result = this.add(num1,num2).toString();
                break;
            case "-":
                this.#result = this.subtract(num1,num2).toString();
                break;
            case "*":
                this.#result = this.multiply(num1,num2).toString();
                break;
            case "/":
                this.#result = this.divide(num1,num2).toString();
        }
        this.#num1String = "";
        this.#num2String = "";
        this.#operator = "";
        this.setDisplay(this.#result);

    }

    setDisplay(num){
        const display = document.querySelector("#output");
        display.textContent = num;
    }

    add(num1, num2){
        return num1 + num2;
    }
    
    subtract(num1, num2){
        return num1-num2;
    }
    
    multiply(num1, num2){
        return num1*num2;
    }
    
    divide(num1, num2){
        if(num2==0){
            this.#num1String = "";
            this.#num2String = "";
            return this.#divideByZeroMessage;
        }
        if(num1 % num2 !=0){
            this.#deci = true;
        }
        return num1/num2;
    }

    equals(){
        this.operate();
        this.#operator = "";
    }

    addDecimal(){
        this.#deci=true;
        this.setNumber(".");
    }

    changeSign(){
        if(this.#num2String!=""){
            if(this.#num2String.indexOf("-")!=-1){
                this.#num2String = this.#num2String.substring(1)   
            }
            else{
                this.#num2String = "-" + this.#num2String;
            }
            this.setDisplay(this.#num2String);
        }
        else if(this.#num1String!=""){
            if(this.#num1String.indexOf("-")!=-1){
                this.#num1String = this.#num1String.substring(1)   
            }
            else{
                this.#num1String = "-" + this.#num1String;
            }
            this.setDisplay(this.#num1String);
        }
        else if(this.#result){
            if(this.#result.indexOf("-")!=-1){
                this.#result = this.#result.substring(1)   
            }
            else{
                this.#result = "-" + this.#result;
            }
            this.setDisplay(this.#result);
        }
    }
    makePercent(){
        this.#deci = true;
        if(this.#num2String!=""){
            let num2 = this.#deci==false ? Number.parseInt(this.#num2String,10) : Number.parseFloat(this.#num2String);
            num2 /=100;
            this.#num2String = num2.toString();
            this.setDisplay(this.#num2String);
        }
        else if(this.#num1String){
            let num1 = this.#deci==false ? Number.parseInt(this.#num1String,10) : Number.parseFloat(this.#num1String);
            num1 /=100;
            this.#num1String = num1.toString();
            this.setDisplay(this.#num1String);
        }
        else{
            let result = Number.parseFloat(this.#result);
            result /= 100;
            this.#result = result.toString();
            this.setDisplay(this.#result);
        }
    }

}



const numBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".operators")
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");
const decimalBtn = document.querySelector("#decimal");
const signChangeBtn = document.querySelector("#sign-change");
const percentBtn = document.querySelector("#percent");

const calc = new Calculator();

numBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        calc.setNumber(e.target.textContent);
    })
})

opBtns.forEach((button) => {
    button.addEventListener("click", (e) =>{
        calc.setOperator(e.target.textContent);
    })
})


clearBtn.addEventListener("click", () =>{
    calc.clear();
})

equalsBtn.addEventListener("click", () =>{
    calc.operate();
})

decimalBtn.addEventListener("click", () =>{
    calc.addDecimal();
})

signChangeBtn.addEventListener("click", () =>{
    calc.changeSign();
})

percentBtn.addEventListener("click", () => {
    calc.makePercent();
})
