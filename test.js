function ValidURL(str) {
    var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
        '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
        '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
        '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
        '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
        '(\#[-a-z\d_]*)?$','i'); // fragment locater
    if(!pattern.test(str)) {
        alert("Please enter a valid URL.");
        return false;
    } else {
        return true;
    }
}

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
        return false;
    else
        return true;
};


var testCase1 = "http://en.wikipedia.org/wiki/Procter_&_Gamble";
console.log(isValidURL(testCase1)); // return true

var testCase2 = "http://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&docid=nIv5rk2GyP3hXM&tbnid=isiOkMe3nCtexM:&ved=0CAUQjRw&url=http%3A%2F%2Fanimalcrossing.wikia.com%2Fwiki%2FLion&ei=ygZXU_2fGKbMsQTf4YLgAQ&bvm=bv.65177938,d.aWc&psig=AFQjCNEpBfKnal9kU7Zu4n7RnEt2nerN4g&ust=1398298682009707";
console.log(isValidURL(testCase2)); // return true

var testCase3 = "https://sdfasd";
console.log(isValidURL(testCase3)); // return false

var testCase4 = "dfdsfdsfdfdsfsdfs";
console.log(isValidURL(testCase4)); // return false

var testCase5 = "magnet:?xt=urn:btih:123";
console.log(isValidURL(testCase5)); // return false

var testCase6 = "https://stackoverflow.com/";
console.log(isValidURL(testCase6)); // return true

var testCase7 = "https://w";
console.log(isValidURL(testCase7)); // return false

var testCase8 = "https://sdfasdp.phplylj";
console.log(isValidURL(testCase8)); // return false

var testCase9 = null;
// console.log(isValidURL(testCase9));



url = 'http://google';
// console.log(ValidURL(url));
// console.log(isURL(url));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

console.log(getRandomInt(3, 100000));