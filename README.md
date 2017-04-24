# filemaker-rest-connector

## Synopsis

NPM Package to make queries to FileMaker's REST API. Will allow node.js to communicate with the FileMaker Server DATA REST API.

## Code Example

```
var FileMaker = require('filemaker');
var filemaker = new FileMaker(
    {
	    "protocol" : "https",
	    "ip" : "127.0.0.1",
	    "solution" : "contacts",
	    "headers" : {"Content-Type" : "application/json"},
	    "body" : {"user" : "Admin", "password" : "Admin", "layout": layout},
	    "selfSignedCertificate" : false
}
);
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
```

This is an example of how to authenticate to get an Access Token.
1. Initailse the object with a JSON object.
2. Test for a request error
3. Test for a FileMaker error
4. Handle success response object

## Motivation

With the introduction of REST to the FileMaker server in version 16 and with the world of javascript exloding in the recent years. We decided that it would be prudent to develop an easy helpful wrapper module on npm. That would use FileMakers REST API extremly easy to use.

## Installation

You first need to make sure that **Contacts.fmp12** has been added to **FileMaker Server 16**.
*FileMaker Server 16 is required as this is the first version of server that implemented the REST API*.

```
cd ROOT_FOLDER
npm install filemaker-rest-connector
```

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

```
cd ROOT/node_modules/filemaker-rest-connector
npm test
```

This will run all the use test cases already built into the system. If the **Contacts.fmp12** file is configured properly on your FileMaker Server 16 server, all tests should pass.

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