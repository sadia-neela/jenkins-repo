const hooks = {
    before: async function (capabilities, specs) {
        try {
            console.log('*** Test execution started ***');
        } catch (err) {
            console.error('Error in before hook:', err);
        }
    },
    after: async function (result, capabilities, specs) {
        try {
            console.log('*** Test execution finished ***');
        } catch (err) {
            console.error('Error in after hook:', err);
        }
    }
};

export default hooks;
