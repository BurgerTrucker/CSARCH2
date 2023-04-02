function loadInputs(){
    const bitInput = "<div class = \"inputBitBox\"><input value = \"0\" type = \"text\" class = \"inputBit red\"></div>"
    const hexInput = "<div class = \"inputBitBox\"><input value = \"0\" type = \"text\" class = \"inputBit\"></div>"
    $("#signBit").append(bitInput);
    for(let i = 0; i < 11; i++){
        $("#exponent").append(bitInput);
    }
    for(let i = 0; i < 26; i++){
            $("#mantissa").append(bitInput)
    }
    for(let i = 0; i < 26; i++){
        $("#mantissa1").append(bitInput)
    }
    for(let i = 0; i < 16; i++){
        $("#hexadecimal").append(hexInput);
    }
}

function nextDigit(current){
    if($(current).parent().next().length==0) {
        if($(current).parents(".inputBits").next(".inputBits").length==0)
          $(current).parents(".inputBox").next().find(".inputBits").children(":first").children(":first").focus();
        else
            $(current).parents(".inputBits").next().children(":first").children(":first").focus();
    }
    else $(current).parent().next().children().focus();
}

function previousDigit(current){
    if($(current).parent().prev().length==0) {
        if($(current).parents(".inputBits").prev(".inputBits").length==0)
            $(current).parents(".inputBox").prev().find(".inputBits").children(":last").children().focus();
        else
            $(current).parents(".inputBits").prev().children(":last").children().focus();
    }
    else $(current).parent().prev().children().focus();
}

function getInput(type){
    var ret = ""
    if(type === "hexadecimal"){
        $("#hexadecimal").children().each(function(index, hexDigitBox){
            ret = ret + $(hexDigitBox).children(":first").val();
        })
    }else if(type ==="binary"){
        $("#signBit").children().each    (function(index, bitBox){
            ret = ret + $(bitBox).children(":first").val();
        })
        $("#exponent").children().each    (function(index, bitBox){
            ret = ret + $(bitBox).children(":first").val();
        })
        $("#mantissa").children().each    (function(index, bitBox){
            ret = ret + $(bitBox).children(":first").val();
        })
        $("#mantissa1").children().each    (function(index, bitBox){
            ret = ret + $(bitBox).children(":first").val();
        })
    }
    return ret;
}
function updateOutput(type){
    var input = getInput(type)
    var output;
    output = convertBinaryToDecimal(input);

    $("#output").text(output);
}

function isValidCharacter(type, character){
    if(type === "hexadecimal"){
        if("0123456789ABCDEF".includes(character)) return true;
        return false;
    }else if(type  ==="binary"){
        if("01".includes(character)) return true;
        return false;
    }
    return false;
}
$(document).ready(function(){
    loadInputs();

    $(".inputBit").on("click mousedown mouseup", function(event){
        event.preventDefault()
    })
    $(".inputBitBox").on("mousedown", function(event){
            const inputBit = $(this).find(".inputBit");
            $(inputBit).focus();
    })
    $(".inputBit").on("focus", function (event){
        var tmpStr = $(this).val()
        $(this).val("");
        $(this).val(tmpStr);
        $(this).parent().addClass("focus")
        focus = this;
    })
    $(".inputBit").on("focusout", function(event){
        $(this).parent().removeClass("focus");
    })

    $(".inputBit").on("keydown", function(event){
        var key = event.which||event.keyCode ;
        if(key === 8){
            event.preventDefault();

            $(this).val("0");
            $(this).change();
            previousDigit(this);

        }else if(key === 37){
            event.preventDefault()
            previousDigit(this)
        }else if(key===39){
            event.preventDefault()
            nextDigit(this);
        }
    })
    $(".inputBit").on("input", function (event){
        const type = $("#inputType").val();
        var character = $(this).val();
        character = character.substring(character.length-1)
        character=  character.toUpperCase();
        if(isValidCharacter(type, character)){
            $(this).val(character)

            nextDigit(this);
            event.preventDefault();
            $(this).change();
        }else{
            $(this).val("0")
            event.preventDefault();
        }
    })
    $(".inputBit").on("change", function(event){
        const type = $("#inputType").val();
        const character= $(this).val();
        if(type === "binary"){
            if (character === "1") {
                $(this).addClass("green")
                $(this).removeClass("red");
            } else {
                $(this).addClass("red");
                $(this).addClass("green");
            }
        }
        updateOutput(type)
    })

    $("#inputType").on("change", function(event){
            const type = $(this).val();
            if(type === "binary" ) {
                $("#binaryDiv").show();
                $("#hexadecimalDiv").hide();
            }else if(type === "hexadecimal"){
                $("#binaryDiv").hide();
                $("#hexadecimalDiv").show();
            }
            updateOutput(type);
    })

    $("#copy").on("click", async function(event) {

        try {
            await navigator.clipboard.writeText($("#output").text());
        } catch (err) {
        }
    })

})