import { test as baseTest, expect } from "@playwright/test";
import HomePage from "./HomePage.js";

export const test = baseTest.extend( {
    homePage: async ( { page }, use ) => {
        const model = new HomePage( page );
        await use( model );
    },
} );

export { expect };
