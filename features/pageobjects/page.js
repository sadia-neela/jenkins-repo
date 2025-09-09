import { browser } from '@wdio/globals'
import fs from 'fs';
import pathModule from 'path';

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        const url = fs.readFileSync(pathModule.resolve(process.cwd(), 'url.txt'), 'utf-8').trim();
        return browser.url(`${url}/${path}`);
    }
}
