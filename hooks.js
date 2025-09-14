const hooks = {
    beforeSession: function () {
        console.log('*** WDIO Session started ***');
    },
    afterSession: function () {
        console.log('*** WDIO Session finished ***');
    }
};
export default hooks;
