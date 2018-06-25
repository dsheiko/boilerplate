const devices = require( "puppeteer/DeviceDescriptors" ),
      bs = require( "../shared/BrowserSession" ),
      { png } = require( "../shared/helpers" ),
      { BASE_URL, SEL_FORM, SEL_SUBMIT, SEL_EMAIL, SEL_FNAME,
      SEL_JUMBOTRON_DESC, NETWORK_TIMEOUT } = require( "../shared/constants" );

jest.setTimeout( NETWORK_TIMEOUT );

describe( "Boostrap Form Demo", () => {


  beforeEach(async () => {
    await bs.setup();
  });

  afterEach(async () => {
    await bs.teardown();
  });


  describe( "Page", () => {

    describe( "on PC/Notebook 1280x1024", () => {


        beforeEach(async () => {
          await bs.page.setViewport({ width: 1280, height: 1024 });
          await bs.page.goto( BASE_URL, { waitUntil: "networkidle2" } );
        });

        it( "has Jumbotron description", async () => {
          await bs.page.screenshot( png( `rwd-jumbotron-on-1280x1024` ) );
          const el = await bs.page.$( SEL_JUMBOTRON_DESC );
          const isVisible = ( await el.boundingBox() !== null );
          expect( isVisible ).toBeTruthy();
        });

        it( "keeps Email/First Name inputs on the same line", async () => {
          const form = await bs.page.$( SEL_FORM ),
                email = await bs.page.$( SEL_EMAIL ),
                firstName = await bs.page.$( SEL_FNAME );

          await form.screenshot( png( `rwd-email-fname-on-1280x1024` ) );
          const emailBox = await email.boundingBox(),
                firstNameBox = await firstName.boundingBox();

          expect( emailBox.y ).toEqual( firstNameBox.y );

        });

    });

    describe( "on iPhone X", () => {


        beforeEach(async () => {
          await bs.page.emulate( devices[ "iPhone X" ] );
          await bs.page.goto( BASE_URL, { waitUntil: "networkidle2" } );
        });

        it( "does not have Jumbotron description", async () => {
          await bs.page.screenshot( png( `rwd-jumbotron-on-iPhoneX` ) );
          const el = await bs.page.$( SEL_JUMBOTRON_DESC );
          const isVisible = ( await el.boundingBox() !== null );
          expect( isVisible ).not.toBeTruthy();
        });


        it( "keeps Email/First Name inputs one under another", async () => {
          const form = await bs.page.$( SEL_FORM ),
                email = await bs.page.$( SEL_EMAIL ),
                firstName = await bs.page.$( SEL_FNAME );

          await form.screenshot( png( `rwd-email-fname-on-iPhoneX` ) );
          const emailBox = await email.boundingBox(),
                firstNameBox = await firstName.boundingBox();

          expect( emailBox.y ).not.toEqual( firstNameBox.y );
        });

    });


  });
});