

    function getInput(var1) {
        console.log("input: " + var1);
        let var2 = var1.split(" ");
        let newVar = var2.join("");
        console.log("trimmed input: " + newVar);
        //if input is hex must have 16 hex digits
        if(newVar.length === 16){
            const regex = /[0-9A-Fa-f]{16}/g;
            if(regex.test(newVar) ===  false)
                newVar = -1

        }
        //if input is binary must have 64 bits
        else if (newVar.length !== 64) {
            document.getElementById("errorMsg").innerHTML = '';
            document.getElementById("output").innerHTML = '';
            document.getElementById("scientific").innerHTML = '';
            document.getElementById("errorMsg").innerHTML = "Invalid Input";
            newVar = -1;

        }
        return newVar
    }

    function convertHexadecimalToBinary(hexStr){
        let binStr = ""
        for(let i = 0; i < hexStr.length; i++){
            let temp = parseInt(hexStr[i], 16).toString(2);
            console.log("Temp: " + temp)
            while(temp.length <4){
                temp = '0' + temp;
            }
            binStr = binStr + temp;
        }
        return binStr
    }

    function convertBinaryToDecimal(binaryStr){
        console.log("binaryStr length: " + binaryStr)
        if (binaryStr.length === 16){
            binaryStr = convertHexadecimalToBinary(binaryStr);
        }
        console.log("Binary Str: " + binaryStr);
        let signBit = parseInt(binaryStr.charAt(0));
        let exponentBits = binaryStr.substring(1,12);
        let mantissaBits = binaryStr.substring(12);
        console.log("Sign Bit: " + signBit)
        console.log("Exponent Bits: " + exponentBits)
        console.log("Mantissa Bits: " + mantissaBits)

        let exponent = parseInt(exponentBits, 2);
        console.log("Exponent: " + exponent);


        let mantissaVal = 0;
        /*
        Algorithm:
        1. get the decimal value of the mantissa
            a. 0 or 1 multiplied by 2 raised to place of bit (starting from 1 since to the right of the decimal place)
            b. add 1 afterwards because 1 times 2 raised to 0
        2. multiply decimal value of mantissa to 2 raised to the  exponent
        3.
         */

        console.log("parseInt exp: " + parseInt(exponentBits, 10))
        console.log("mantissa bits: " + mantissaBits)
        console.log("first mantissa char: " + mantissaBits.charAt(0))
        console.log("parsed mantissa bits: " + parseInt(mantissaBits, 10))

        //Special Case 1: +0, -0
        if(signBit === 0 &&  parseInt(exponentBits, 10) === 0 && parseInt(mantissaBits, 10) === 0){
            if(signBit === 0)
                return "+0"
            else
                return "-0"
        }
        //Special Case 2: Denormalized
        else if(exponent === 0 && parseInt(mantissaBits, 10) !== 0){
            return "Denormalized"
        }
        //Special Case 3: +inf, -inf
        else if(exponent  === 2047 && parseInt(mantissaBits, 10) === 0){
            if(signBit === 0)
                return "+inf"
            else
                return "-inf"

        }
        //Special Case 4: sNaN, qNan
        else if(exponent === 2047 && mantissaBits.charAt(0) === '0'){
            return "sNan"
        }
        else if(exponent  === 2047 && mantissaBits.charAt(0) === '1'){
            return "qNan"
        }

        else{
            exponent = exponent - 1023;
            console.log("Exponent: " + exponent);
            for(let i = 0; i < mantissaBits.length; i++ ){

                mantissaVal = mantissaVal + parseInt(mantissaBits.charAt(i)) * Math.pow(2, -(i+1));
            }
            console.log("Decimal: " + mantissaVal);
            mantissaVal = mantissaVal + 1
            console.log("Decimal: " + mantissaVal);
            mantissaVal = mantissaVal * Math.pow(2, exponent);
            console.log("Decimal: " + mantissaVal);
            if(signBit){
                mantissaVal = mantissaVal * -1
            }
            return mantissaVal;
        }

    }

    function convertFixedToFloat(decimalStr){
        console.log("Decimal Str: " + decimalStr)
        let decimal = parseFloat(decimalStr);
        console.log("decimal parse int convert fixed to float: " + decimal)
        if(decimal === 0){
            return "0";
        }
        else{
            let exponent = Math.floor(Math.log10(Math.abs(decimal)))
            console.log("scientific notation exp floor: " + exponent);
            let mantissa = (decimal / Math.pow(10, exponent))
            return mantissa + "e" + exponent
        }
    }


    //input: 16 digit hex OR 64 bit binary input
    //output: Decimal; fixed o floating point
    // $("#submit").on("click", function(){
    //     let newVar = getInput(document.getElementById("inputBox").value)
    //     if (newVar !== -1){
    //         let finalAns = convertBinaryToDecimal(newVar)
    //         console.log(finalAns);
    //         let scientificRep = convertFixedToFloat(finalAns)
    //         document.getElementById("errorMsg").innerHTML = '';
    //         document.getElementById("output").innerHTML = '';
    //         document.getElementById("scientific").innerHTML = '';
    //         document.getElementById("output").innerHTML = finalAns;
    //         document.getElementById("scientific").innerHTML = scientificRep;
    //
    //     }
    // });


