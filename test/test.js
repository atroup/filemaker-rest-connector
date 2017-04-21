'use strict';

var expect = require ('chai').expect;
var filemakerTests = require('../index');

var protocol = 'https';
var ip = '127.0.0.1';
var solution = 'contacts';
var layout = 'rest_contacts';
var loginHeaders = {
	"headers" : {"Content-Type" : "application/json"},
	"body" : {"user" : "StevenAdmin", "password" : "steven", "layout": layout}
}

describe('#filemakerTests', function() {
	describe('#setConstructor', function () {
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
		
		it('Set/Get Result', function() {
			var filemaker = filemakerTests();
			var resultT = {"errorCode" : "0", "layout" : "Layout", "token": "FM-Token"};
			filemaker.setResult(resultT);
			var result = filemaker.getResult();
			expect(result).to.deep.equal(resultT);
		});
		
		it('Set/Get Token', function() {
			var filemaker = filemakerTests();
			var token = '123qweasdzxc';
			filemaker.setToken(token);
			var result = filemaker.getToken();
			expect(result).to.deep.equal(token);
		});
	});
	
	describe('#Authentication', function (){
		describe('#Login', function () {
			it('Login', function(done) {
				var filemaker = filemakerTests(loginHeaders);
				filemaker.login(protocol, ip, solution, function(error, result) {
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
				});
			});
		});
		
		describe('#Logout', function() {
			var filemaker = filemakerTests(loginHeaders);
			before(function (done) {
				filemaker.login(protocol, ip, solution, function(error, result) {
					if(error) {
						done(error);
					} else {
						done();
					}
				});
			});
			
			it('Logout', function(done) {
				filemaker.setHeaders({"FM-Data-token" : filemaker.getToken()});
				filemaker.logout(protocol, ip, solution, function(error, result) {
					if(!error) {
						if(result.errorMessage === 'Missing FM-Data-token.') {
							done(result.errorMessage);
						} else if (result.errorCode !== '0') {
							done(result.errorMessage);
						} else {
							done();
						}
					} else {
						done(error);
					}
				});
			});
		});
	});
	
	describe('#Record', function(){
		
		var filemaker;
		
		beforeEach(function (done) {
			filemaker = filemakerTests(loginHeaders);
			filemaker.login(protocol, ip, solution, function(error, result) {
				if(error) {
					done(error);
				} else {
					
					done();
				}
			});
			
		});
		
		it('Get Records', function(done) {
			filemaker.getRecords(protocol, ip, solution, layout, null, function(error, result) {
				if (result.errorCode !== '0') {
					done(result.errorCode);
				} else {
					done();
				}
			});
		});
		
		it('Get Records (Offset)', function(done) {
			filemaker.getRecords(protocol, ip, solution, layout, 2, function(error, result) {
				if (result.errorCode !== '0') {
					done(result.errorCode);
				} else {
					done();
				}
			});
		});
		
	});
	
});