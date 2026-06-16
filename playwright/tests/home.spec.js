import { test, expect } from "./base/fixtures.js";
import { VIEWPORTS, isLeftTo } from "./include/constants.js";

test.describe( "Home: RWD", () => {

    test( "desktop layout", async ( { homePage: $ } ) => {
        await $.openPage( { viewport: VIEWPORTS.WUXGA } );
        await $.screenshot( "Home desktop" );

        await expect( $.jumbotronDescLoc ).toBeVisible();

        const emailBox = await $.emailLoc.boundingBox();
        const nameBox = await $.nameLoc.boundingBox();
        expect( isLeftTo( emailBox, nameBox ) ).toBeTruthy();
    } );

    test( "mobile layout", async ( { homePage: $ } ) => {
        await $.openPage( { viewport: VIEWPORTS.IPHONE8 } );
        await $.screenshot( "Home mobile" );

        await expect( $.jumbotronDescLoc ).not.toBeVisible();

        const emailBox = await $.emailLoc.boundingBox();
        const nameBox = await $.nameLoc.boundingBox();
        expect( isLeftTo( emailBox, nameBox ) ).toBeFalsy();
    } );

} );

test.describe( "Home: Form", () => {

    test.beforeEach( async ( { homePage: $ } ) => {
        await $.openPage();
    } );

    test( "submit button disabled before input", async ( { homePage: $ } ) => {
        await expect( $.submitBtnLoc ).toBeDisabled();
    } );

    test( "submit button enabled after filling required fields", async ( { homePage: $ } ) => {
        await $.emailLoc.fill( "user@example.com" );
        await $.nameLoc.fill( "John" );
        await expect( $.submitBtnLoc ).toBeEnabled();
    } );

    test( "shows validation error on invalid email", async ( { homePage: $ } ) => {
        await $.emailLoc.fill( "not-an-email" );
        await $.submitBtnLoc.click();
        await expect( $.formErrorLoc ).toBeVisible();
    } );

} );
