# filemaker-rest-connector

## Synopsis

NPM Package to make queries to FileMaker's REST API. Will allow node.js to communicate with the FileMaker Server DATA REST API.

## Code Example

'''
var FileMaker = require('filemaker');
var filemaker = new FileMaker();
filemaker.login(function(error, result) {
    if(error) {
        // Handle error
    } else {
        if(result.errorCode ==! '0') {
            // Handle FileMaker Error
        } else {
            // Success
        }
    }
};)
'''

This is an example of how to authenticate using the function. You first test if an error occurred. This will be an error from the Request to the server. You then test for a FileMaker error that may have occurred. If there are none of these errors then the function executed correctly.

## Motivation

With the introduction of REST to the FileMaker server in version 16 and with the world of javascript exloding in the recent years. We decided that it would be prudent to develop an easy helpful wrapper module on npm. That would use FileMakers REST API extremly easy to use.

## Installation

You first need to make sure that **Contacts.fmp12** has been added to **FileMaker Server 16**.
*FileMaker Server 16 is required as this is the first version of server that implemented the REST API*.


NOT CURRENTLY PUBLISHED TO NPM

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Steven McGill <steven@whitespacesystems.co.uk> (http://whitespacesystems.co.uk)

## License

MIT License

Copyright (c) 2017 stevenwhitespacesystems

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.