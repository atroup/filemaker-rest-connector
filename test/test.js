'use strict';

var expect = require ('chai').expect;
var filemakerTests = require('../index');

describe('#filemakerTests', function() {	
	it('Set/Get Headers', function() {
		var filemaker = filemakerTests();
		var headers = {"Content-Type" : "application/json"};
		filemaker.setHeaders(headers);
		var result = filemaker.getHeaders();
		expect(result).to.deep.equal(headers);
	});
	it('Set/Get Body', function() {
		var filemaker = filemakerTests();
		var body = {"user" : "Username", "password" : "Password", "layout": "Layout"};
		filemaker.setBody(body);
		var result = filemaker.getBody();
		expect(result).to.deep.equal(body);
	});
	it('Authenticate', function(done) {
		var filemaker = filemakerTests();
		filemaker.authenticate('https', '127.0.0.1', 'contacts', function(error, result) {
			if(!error) {
				if(result.errorMessage === 'Method Not Allowed') {
					done(result.errorMessage);
				} 
				else if(result.errorMessage === 'Unsupported Media Type') {
					done(result.errorMessage);
				} 
				else if (result.errorCode !== '0') {
					done(result.errorMessage);
				}
				else {
					done();
				}				
			} else {
				done(error);
			}
		})
		
	});
});