import { browser } from '@wdio/globals';
import allure from '@wdio/allure-reporter';

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
    },
    
    // NEW: Add screenshot on step failure
    afterStep: async function (step, context, result) {
        try {
            if (result.error) {
                console.log('Step failed - capturing screenshot...');
                const screenshot = await browser.takeScreenshot();
                allure.addAttachment('Screenshot on Failure', Buffer.from(screenshot, 'base64'), 'image/png');
                console.log('Screenshot captured and attached to report');
            }
        } catch (err) {
            console.error('Error capturing screenshot in afterStep hook:', err);
        }
    },
    
    // NEW: Add screenshot on test failure (alternative)
    afterTest: async function (test, context, result) {
        try {
            if (result.error) {
                console.log('Test failed - capturing screenshot...');
                const screenshot = await browser.takeScreenshot();
                allure.addAttachment('Test Failure Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
                
                // Also capture page source for additional debugging
                try {
                    const pageSource = await browser.getPageSource();
                    allure.addAttachment('Page Source', pageSource, 'text/html');
                } catch (sourceError) {
                    console.error('Error capturing page source:', sourceError);
                }
                
                console.log('Screenshot and page source captured for failed test');
            }
        } catch (err) {
            console.error('Error capturing screenshot in afterTest hook:', err);
        }
    }
};

export default hooks;
