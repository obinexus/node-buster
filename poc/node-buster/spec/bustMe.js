const hello = (name) => {
    return `Hello, ${name}!`;
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = hello;
}else if (typeof define === 'function' && define.amd) {
    define([], function() {
        return hello;
    });
}
else {
    window.hello = hello;
}
