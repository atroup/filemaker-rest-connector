# filemaker-rest-connector

## Synopsis

NPM Package to make queries to FileMaker's REST API. Will allow node.js to communicate with the FileMaker Server 17 DATA REST API.

**Note that this is a forked package, updated to support FileMaker 17's REST API, and it is not backwards compatible with version 16.**

## Code Example

```
var FileMaker = require('filemaker-rest-connector');
var filemaker = new FileMaker(
    {
	    "protocol" : "https",
	    "ip" : "127.0.0.1",
	    "solution" : "contacts",
	    "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : "Basic " + Buffer.from("user:password").toString("base64")
        },
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

(Note how the authentication header should be base64 encoded)

This is an example of how to authenticate to get an Access Token.

1.  Initialise the object with a JSON object.
2.  Test for a request promise rejection error
3.  Test for a FileMaker response error
4.  Handle success response object (promise based)

## Motivation

With the release of FileMaker 17, the REST API has been updated. Previous versions of this package only worked with version 16, and it was time for an update.

## Installation

You first need to make sure that **Contacts.fmp12** has been added to **FileMaker Server 16**.
_FileMaker Server 17 is required_.

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

Connect Solutions (http://connect.solutions)

Original Author:
Steven McGill <mailto:steven@whitespacesystems.co.uk> (http://whitespacesystems.co.uk)

## License

MIT License

Copyright (c) 2018 Connect Solutions

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
