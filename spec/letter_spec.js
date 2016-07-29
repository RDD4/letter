'use strict';
//测试邮编转条码
describe("isLegalPostcode",function () {
    it("should judge this postcode is or not is legal",function () {
        let postcode = "12345";
        let result = isLegalPostcode(postcode);
        expect(result).toEqual(true);
    });
    it("should judge this postcode is or not is legal",function () {
        let postcode = "45056-1234";
        let result = isLegalPostcode(postcode);
        expect(result).toEqual(true);
    });
    it("should judge this postcode is or not is legal",function () {
        let postcode = "4505234";
        let result = isLegalPostcode(postcode);
        expect(result).toEqual(false);
    });
});
describe("formatPostcode",function () {
    it("should format postcode",function () {
        let postcode = "45056-1234";
        let isLegal = true;
        let result = formatPostcode(postcode,isLegal);
        expect(result).toEqual("450561234");
    });
});
describe("calculateCheckDigit",function () {
    it("should calculate checkDigit",function () {
        let formattedPostcode = "450561234";
        let result = calculateCheckDigit(formattedPostcode);
        expect(result).toEqual(0);
    });
});
describe("matchBarcode",function () {
    it("should match to barcode",function () {
        let formattedPostcode = "450561234";
        let checkDigit = 0;
        let result = matchBarcode(formattedPostcode,allRegulars,checkDigit);
        expect(result).toEqual(":|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::");
    });
});
describe("printBarcode",function () {
    it("should print correct barcode",function () {
        let finalBarcode = ":|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::";
        let result = printBarcode(finalBarcode);
        expect(result).toEqual("|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|");
    });
});
describe("main",function () {
    it("should go main",function () {
        let postcode = "45056-1234";
        let result = main1(postcode);
        expect(result).toEqual("|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|");
    });
});

//测试条码转邮编
describe("isLegalBarcode",function () {
    it("should judge this barcode is or not is legal",function () {
        let barcode = "| |:|:: :|:|: |:::| :::|| ::||: :|:|: |";
        let result = isLegalBarcode(barcode);
        expect(result).toEqual(true);
    });
    it("should judge this Frame is or not is legal",function () {
        let barcode = "| |:|*: :|:|: |:::| :::|| ::||: :|:|: |";
        let result = isLegalBarcode(barcode);
        expect(result).toEqual(false);
    });
    it("should judge this Frame is or not is legal",function () {
        let barcode = "||:|:: :|:|: |:::| :::|| ::||: :|:|: |";
        let result = isLegalBarcode(barcode);
        expect(result).toEqual(false);
    });
});
describe("formatBarcode",function () {
    it("should format barcode",function () {
        let barcode = "| |:|:: :|:|: |:::| :::|| ::||: :|:|: |";
        let result = formatBarcode(barcode);
        expect(result).toEqual(["|:|::",":|:|:","|:::|",":::||","::||:",":|:|:"]);
    });
});
describe("matchPostcode",function () {
    it("should match to postcode",function () {
        let formattedBarcode = ["|:|::",":|:|:","|:::|",":::||","::||:",":|:|:"];
        let result = matchPostcode(formattedBarcode, allRegulars);
        expect(result).toEqual(957135);
    });
});
describe("main",function () {
    it("should go main",function () {
        let barcode = "| |:|:: :|:|: |:::| :::|| ::||: :|:|: |";
        let result = main2(barcode);
        expect(result).toEqual(957135);
    });
});
