/// <reference path="./console-log-html.d.ts" />
//
// Requesting NPM module
import { connect } from "console-log-html";
// Requesting module by relative path
import { utilFoo } from "./util/foo";

// Redirecting log message to HTML
connect( document.querySelector( "#log" ) );

console.log( "Compiled modules exports ", utilFoo() );