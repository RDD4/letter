'use strict';
//加载转换表
let allRegulars = loadRegularTable();

//判断邮编是否合法
function isLegalPostcode(postcode) {
    if (postcode.length !== 5 && postcode.length !== 9 && postcode.length !== 10) {
        return false;
    }

    for (let i = 0; i < postcode.length; i++) {
        if (typeof postcode.charAt(i) != "number" && postcode.charAt(i) !== "-") {
            return true;
        }
    }
}

//格式化邮编(去掉“－”)
function formatPostcode(postcode) {
    let formattedPostcode = '';
    if (postcode.indexOf('-')) {
        formattedPostcode = postcode.replace('-', '');
    }
    return formattedPostcode;
}
//计算校验码
function calculateCheckDigit(formattedPostcode) {
    let sum = 0;
    let checkDigit = 0;
    for (let i = 0; i < formattedPostcode.length; i++) {
        sum += parseInt(formattedPostcode.charAt(i));
    }
    if (sum % 10 === 0) {
        checkDigit = 0;
    } else {
        let temp = Math.ceil(sum / 10);
        checkDigit = temp * 10 - sum;
    }
    return checkDigit;
}

//匹配
function matchBarcode(formattedPostcode, allRegulars, checkDigit) {
    let finalBarcode = Array.from((formattedPostcode + checkDigit)).map(function (info) {
        return allRegulars[parseInt(info)];
    });
    finalBarcode = finalBarcode.join("");
    return finalBarcode;
}
//输出
function printBarcode(finalBarcode) {
    return "|" + finalBarcode + "|";
}
//主调
function main1(postcode) {
    let isLegal = isLegalPostcode(postcode);
    if (isLegal) {
        let formattedPostcode = formatPostcode(postcode);
        let checkDigit = calculateCheckDigit(formattedPostcode);
        let finalBarcode = matchBarcode(formattedPostcode, allRegulars, checkDigit);
        return printBarcode(finalBarcode);
    }
}



//判断条码是否合法
function isLegalBarcode(barcode) {
    //验证条码内容是否合法
    for (let i = 0; i < barcode.length; i++) {
        if (barcode.charAt(i) !== ":" && barcode.charAt(i) !== "|" && barcode.charAt(i) !== " ") {
            return false;
        }
    }
    //验证条码框架是否合法
    if (barcode.length >= 4) {
        if (barcode.charAt(0) === "|" && barcode.charAt(1) === " " &&
            barcode.charAt(barcode.length - 2) === " " && barcode.charAt(barcode.length - 1) === "|") {
            return true;
        }
    }
    //验证连续的是否由5个字符组成
    let flag = 1;
    let splitedBarcode = barcode.split(" ");
    for (let i = 0; i < splitedBarcode.length; i++) {
        if (splitedBarcode[i].length != 5) {
            flag = 0;
        }
    }
    return !!flag;
}
//格式化条码(去掉左右的“｜”,5个一分割，存入一个数组)
function formatBarcode(barcode) {
    return barcode.slice(2, -2).split(' ');
}
//匹配
function matchPostcode(formattedBarcode, allRegulars) {
    let finalPostcode = formattedBarcode.map(function (item) {
        return allRegulars.indexOf(item);
    });
    let sum = finalPostcode.reduce(function (first, second) {
        return first + second;
    }, 0);
    if (sum % 10 == 0) {
        finalPostcode = parseInt(finalPostcode.join(""));
    } else {
        return false;
    }
    return finalPostcode;
}
//主调
function main2(barcode) {
    let isLegal = isLegalBarcode(barcode);
    if (isLegal) {
        let formattedBarcode = formatBarcode(barcode);
        return matchPostcode(formattedBarcode, allRegulars);
    }
}




