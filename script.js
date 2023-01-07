const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");
let QR_Code;
let sizeChoice, BGColorChoice, FGColorChoice;

//Set size
sizeOptions.addEventListener("change",()=>{
    sizeChoice = sizeOptions.value;
});

//set background color
BGColor.addEventListener("input",()=>{
    BGColorChoice = BGColor.value;
});

//Set foreground color
FGColor.addEventListener("input",()=>{
    FGColorChoice = FGColor.value;
});

//Format input
const inputFormatter = (value)=>{
    value = value.replace(/[^a-z0-9A-Z]+/g,"");
    return value;
};

submitBtn.addEventListener("click",async()=>{
    container.innerHTML = "";
    //QR code generation
    QR_Code = await new QRCode(container,{
        text: userInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice
    });

    //Set url for download
    const src = container.firstChild.toDataURL("image/png");
    downloadBtn.href = src;
    let userValue = userInput.value;
    try{
        userValue = new URL(userValue).hostname;
    }catch(_){
        userValue = inputFormatter(userValue);
        downloadBtn.download = `${userValue}QR`;
        downloadBtn.classList.remove("hide");
    }
});

userInput.addEventListener("input",()=>{
    if(userInput.value.trim().length < 1){
        submitBtn.disabled = true;
        downloadBtn.href = "";
        downloadBtn.classList.add("hide");
    }else{
        submitBtn.disabled = false;
    }
});

window.onload = ()=>{
    container.innerHTML = "";
    sizeChoice = 100;
    sizeOptions.value = 100;
    userInput.value = "";
    BGColor.value = "#000000";
    FGColor.value = "#ffffff";
    downloadBtn.classList.add("hide");
    submitBtn.disabled = true;
};
