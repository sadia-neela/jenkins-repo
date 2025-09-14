const hooks = {
    before: async function (capabilities, specs) {
        console.log('*** Test execution started ***');
    },
    after: async function (result, capabilities, specs) {
        console.log('*** Test execution finished ***');
    }
};

export default hooks;
