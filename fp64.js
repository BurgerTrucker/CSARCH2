
function convertBinaryToDecimal(binaryStr){
    let signBit = parseInt(binaryStr.charAt(0));
    let exponentBits = binaryStr.substring(1,12);
    let mantissaBits = binaryStr.substring(12);
    // console.log("Sign Bit: " + signBit)
    // console.log("Exponent Bits: " + exponentBits)
    // console.log("Mantissa Bits: " + mantissaBits)

    let exponent = parseInt(exponentBits, 2);
    // console.log("Exponent: " + exponent);
    exponent = exponent - 1023;
    // console.log("Exponent: " + exponent);

    let mantissaVal = 0;
    /*
    Algorithm:
    1. get the decimal value of the mantissa
        a. 0 or 1 multiplied by 2 raised to place of bit (starting from 1 since to the right of the decimal place)
        b. add 1 afterwards because 1 times 2 raised to 0
    2. multiply decimal value of mantissa to 2 raised to the  exponent
    3.
     */

    for(let i = 0; i < mantissaBits.length; i++ ){

        mantissaVal = mantissaVal + parseInt(mantissaBits.charAt(i)) * Math.pow(2, -(i+1));
        // console.log( parseInt(mantissaBits.charAt(i)) * Math.pow(2, -(i+1)))
        console.log(mantissaVal)
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

function convertHexadecimalToDecimal(hexStr){

}

