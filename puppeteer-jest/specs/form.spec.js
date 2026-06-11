const bs = require( "../shared/BrowserSession" ),
      { png } = require( "../shared/helpers" ),
      { BASE_URL, SEL_FORM, SEL_SUBMIT, SEL_EMAIL, SEL_FNAME, SEL_VATID,
        SEL_DAY, SEL_MONTH, SEL_FORM_ERROR, SEL_FILE_INPUT, PATH_FIXTURES,
        ASYNC_TRANSITION_TIMEOUT, NETWORK_TIMEOUT, NAVIGATION_TIMEOUT } = require( "../shared/constants" );

jest.setTimeout( NETWORK_TIMEOUT );

describe( "Boostrap Form Demo", () => {


  beforeEach(async () => {
    await bs.setup();
  });

  afterEach(async () => {
    await bs.teardown();
  });

  describe( "Form", () => {

    beforeEach(async () => {
      await bs.page.setViewport({ width: 1280, height: 1024 });
      await bs.page.goto( BASE_URL, { waitUntil: "load", timeout: NAVIGATION_TIMEOUT } );
    });

    describe( "Submit button", () => {
      it( "is disabled before any input", async () => {
        const form = await bs.page.$( SEL_FORM ),
              submitBtn = await form.$( SEL_SUBMIT );

        await form.screenshot( png( `form-submit-before-input` ) );

        const isDisabled = await form.$eval( `${SEL_SUBMIT}`, el => el.disabled );
        expect( isDisabled ).toBeTruthy();

      });

      it( "is enabled after any input", async () => {
        const form = await bs.page.$( SEL_FORM ),
              submitBtn = await form.$( SEL_SUBMIT ),
              email = await form.$( SEL_EMAIL );

        await email.type( `anything` );
        await form.screenshot( png( `form-submit-after-input` ) );

        const isDisabled = await form.$eval( `${SEL_SUBMIT}`, el => el.disabled );
        expect( isDisabled ).not.toBeTruthy();
      });
    });

    describe( "Email field", () => {
      it( "gets invalid state when invalid email typed in", async () => {

        const form = await bs.page.$( SEL_FORM ),
            submitBtn = await form.$( SEL_SUBMIT ),
            email = await form.$( SEL_EMAIL );

        await email.type( `invalid-email` );
        await submitBtn.click();
        await new Promise( r => setTimeout( r, ASYNC_TRANSITION_TIMEOUT ) );
        const isInvalid = await form.$eval( `${SEL_EMAIL}`, el => el.matches( `:invalid` ) );
        await form.screenshot( png( `form-email-invalid-state` ) );
        expect( isInvalid ).toBeTruthy();

      });
    });

    describe( "Submission", () => {
      it( "gets invalid state when invalid email typed in", async () => {

        const form = await bs.page.$( SEL_FORM ),
            submitBtn = await form.$( SEL_SUBMIT );

        await bs.page.type( `${SEL_FORM} ${SEL_EMAIL}`, `valid@email.com` );
        await bs.page.type( `${SEL_FORM} ${SEL_FNAME}`, `Jon Snow` );
        await bs.page.type( `${SEL_FORM} ${SEL_VATID}`, `DE000` );
        await bs.page.select( `${SEL_FORM} ${SEL_DAY}`, `1` );
        await bs.page.select( `${SEL_FORM} ${SEL_MONTH}`, `May` );
        const fileInput = await bs.page.$( `${SEL_FORM} ${SEL_FILE_INPUT}` );
        await fileInput.uploadFile( `${PATH_FIXTURES}test.gif` );

        await submitBtn.click();
        await bs.page.waitForSelector( `${SEL_FORM}[data-submitted=true]`, { timeout: NAVIGATION_TIMEOUT } );

        await form.screenshot( png( `form-submitted` ) );

        const errorMsg = await form.$eval( `${SEL_FORM_ERROR}`, el => el.innerText );
        expect( errorMsg ).toEqual( `Server error, please try again` );

      });
    });

  });
});