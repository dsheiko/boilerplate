import { AbstractPage } from "./AbstractPage.js";

export default class HomePage extends AbstractPage {
    baseUrl = "./";

    constructor( page ) {
        super( page );
        this.formLoc = page.locator( "form#myform" );
        this.submitBtnLoc = page.locator( "[type=submit]" );
        this.emailLoc = page.locator( "[name=email]" );
        this.nameLoc = page.locator( "[name=firstName]" );
        this.formErrorLoc = page.locator( ".invalid-feedback" ).nth( 0 );
        this.jumbotronDescLoc = page.locator( ".gt-small" ).nth( 0 );
    }
}
