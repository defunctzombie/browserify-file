var through = require('through');

module.exports = function(file) {
    if (!/\.html/.test(file)) return through();

    var source = '';
    var stream = through(
        function write(buf) {
            source += buf;
        },
        function end() {
            this.queue('module.exports=' + JSON.stringify(source) + ';');
            this.queue(null);
        }
    );
    return stream;
};
