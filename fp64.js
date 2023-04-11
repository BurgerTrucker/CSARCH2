    function convertHexadecimalToBinary(hexStr){
        let binStr = ""
        for(let i = 0; i < hexStr.length; i++){
            let temp = parseInt(hexStr[i], 16).toString(2);
            while(temp.length <4){
                temp = '0' + temp;
            }
            binStr = binStr + temp;
        }
        return binStr
    }

    function convertHexadecimalToDecimal(hexStr){
        return convertBinaryToDecimal(convertHexadecimalToBinary(hexStr));
    }
    function convertBinaryToDecimal(binaryStr){
        if (binaryStr.length === 16){
            binaryStr = convertHexadecimalToBinary(binaryStr);
        }
        let signBit = parseInt(binaryStr.charAt(0));
        let exponentBits = binaryStr.substring(1,12);
        let mantissaBits = binaryStr.substring(12);
        let exponent = parseInt(exponentBits, 2);


        let mantissaVal = 0;
        /*
        Algorithm:
        1. get the decimal value of the mantissa
            a. 0 or 1 multiplied by 2 raised to place of bit (starting from 1 since to the right of the decimal place)
            b. add 1 afterwards because 1 times 2 raised to 0
        2. multiply decimal value of mantissa to 2 raised to the  exponent
        3.
         */
        //Special Case 1: +0, -0
        if(parseInt(exponentBits, 10) === 0 && parseInt(mantissaBits, 10) === 0){
            if(signBit === 0)
                return "+0"
            else
                return "-0"
        }
        //Special Case 2: Denormalized
        else if(exponent === 0 && parseInt(mantissaBits, 10) !== 0){
            exponent = -1022;
            for(let i = 0; i < mantissaBits.length; i++ ){

                mantissaVal = mantissaVal + parseInt(mantissaBits.charAt(i)) * Math.pow(2, -(i+1));
            }
            mantissaVal = mantissaVal * Math.pow(2, exponent);
            if(signBit){
                mantissaVal = mantissaVal * -1
            }
            return mantissaVal+ " (Denormalized Value)" ;
        }
        //Special Case 3: +inf, -inf
        else if(exponent  === 2047 && parseInt(mantissaBits, 10) === 0){
            if(signBit === 0)
                return "+Infinity"
            else
                return "-Infinity"

        }
        //Special Case 4: sNaN, qNan
        else if(exponent === 2047 && mantissaBits.charAt(0) === '0'){
            return "sNan/Signaling NaN"
        }
        else if(exponent  === 2047 && mantissaBits.charAt(0) === '1'){
            return "qNan/Quiet NaN"
        }

        else{
            exponent = exponent - 1023;

            for(let i = 0; i < mantissaBits.length; i++ ){
                mantissaVal = mantissaVal + parseInt(mantissaBits.charAt(i)) * Math.pow(2, -(i+1));
            }
            mantissaVal = mantissaVal + 1
            mantissaVal = mantissaVal * Math.pow(2, exponent);
            if(signBit){
                mantissaVal = mantissaVal * -1
            }
            return "" + mantissaVal;
        }
    }

    function convertFixedToFloat(decimalStr){
        let decimal = parseFloat(decimalStr);
        if(decimalStr === "+0" || decimalStr === "-0" || decimalStr === "qNan/Quiet NaN" || decimalStr === "sNan/Signaling NaN" || decimalStr === "+Infinity" || decimalStr === "-Infinity"
            || decimalStr.includes("Denormalized")){
            return decimalStr;
        }
        else{
            let exponent = Math.floor(Math.log10(Math.abs(decimal)))
            let mantissa = (decimal / Math.pow(10, exponent))
            return mantissa + "e" + exponent
        }
    }


    function toPlainString(num) {
        return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
            function(a,b,c,d,e) {
                return e < 0
                    ? b + '0.' + Array(1-e-c.length).join(0) + c + d
                    : b + c + d + Array(e-d.length+1).join(0);
            });
    }


    //input: 16 digit hex OR 64 bit binary input

