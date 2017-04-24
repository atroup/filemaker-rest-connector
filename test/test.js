'use strict';

var expect = require ('chai').expect;
var filemakerTests = require('../index');

var layout = 'rest_contacts';
var loginHeaders = {
	"protocol" : "https",
	"ip" : "127.0.0.1",
	"solution" : "contacts",
	"headers" : {"Content-Type" : "application/json"},
	"body" : {"user" : "StevenAdmin", "password" : "steven", "layout": layout}
}

describe('#FILEMAKER TESTS', function() {
	describe('#CONSTRUCTOR', function () {
		it('Get Protocol', function() {
			var filemaker = filemakerTests(loginHeaders);
			var result = filemaker.getProtocol();
			expect(result).to.equal(loginHeaders.protocol);
		});
		
		it('Get IP', function() {
			var filemaker = filemakerTests(loginHeaders);
			var result = filemaker.getIp();
			expect(result).to.equal(loginHeaders.ip);
		});
		
		it('Get Solution', function() {
			var filemaker = filemakerTests(loginHeaders);
			var result = filemaker.getSolution();
			expect(result).to.equal(loginHeaders.solution);
		});
		
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
		
		it('Set/Get RecordId', function() {
			var filemaker = filemakerTests();
			var recordId = '100';
			filemaker.setRecordId(recordId);
			var result = filemaker.getRecordId();
			expect(result).to.deep.equal(recordId);
		});
	});
	
	describe('#AUTHENTICATION', function (){
		describe('#LOGIN', function () {
			it('Login', function(done) {
				var filemaker = filemakerTests(loginHeaders);
				filemaker.login(function(error, result) {
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
		
		describe('#LOGOUT', function() {
			var filemaker = filemakerTests(loginHeaders);
			before(function (done) {
				filemaker.login(function(error, result) {
					if(error) {
						done(error);
					} else {
						done();
					}
				});
			});
			
			it('Logout', function(done) {
				filemaker.logout(function(error, result) {
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
	
	describe('#RECORD', function(){
		
		var filemaker;
		
		beforeEach(function (done) {
			filemaker = filemakerTests(loginHeaders);
			filemaker.login(function(error, result) {
				if(error) {
					done(error);
				} else {
					
					done();
				}
			});
			
		});
		
		describe('#CREATE/EDIT/DELETE', function(){
			
			var recordId;
			
			it('Create Record (John Smith)', function(done) {
				var params = {
					"Title" : "Mr",
					"First" : "John",
					"Last" : "Smith"
				}
				filemaker.create(layout, params, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						recordId = filemaker.getRecordId();
						done();
					}
				});
			});
			
			it('Edit Record (Jane Smith)', function(done) {
				var params = {
					"Title" : "Mrs",
					"First" : "Jane",
					"Last" : "Smith"
				}
				filemaker.edit(layout, recordId, params, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						done();
					}
				});
			});
			
			it('Delete Record (John Smith)', function(done) {
				filemaker.delete(layout, recordId, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						done();
					}
				});
			});
			
		});
		
		describe('#FINDS/GETS', function(){
			
			it('Get Records', function(done) {
				filemaker.getRecords(layout, null, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						done();
					}
				});
			});
			
			it('Get Records (Offset)', function(done) {
				var params = {
					"offset" : 2
				};
				filemaker.getRecords(layout, params, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						done();
					}
				});
			});
			
			it('Get Records (Range)', function(done) {
				var params = {
					"offset" : 10,
					"range" : 10
				};
				filemaker.getRecords(layout, params, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						done();
					}
				});
			});
			
			it('Get Records (Sort)', function(done) {
				var params = {
					"offset" : 10,
					"sort" : [
						{
							"fieldName" : "Title",
							"sortOrder" : "ascend"
						},
						{
							"fieldName" : "Last",
							"sortOrder" : "descend"
						}
					]
				};
				filemaker.getRecords(layout, params, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						done();
					}
				});
			});
			
			it('Get Records (Portal)', function(done) {
				var params = {
					"offset" : 10,
					"portal" : {
						"Portal1" : {
							"offset" : 1,
							"range" : 2
						},
						"Portal2" : {
							"offset" : 1,
							"range" : 2
						}					
					}
				};
				filemaker.getRecords(layout, params, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						done();
					}
				});
			});
			
			it('Get Record', function(done) {
				filemaker.getRecord(layout, null, 2, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						done();
					}
				});
			});
			
			it('Get Record (Portal)', function(done) {
				var params = {
						"portal" : {
							"Portal1" : {
								"offset" : 1,
								"range" : 2
							}					
						}
					};
				filemaker.getRecord(layout, params, 2, function(error, result) {
					if(result.errorMessage === 'Missing FM-Data-token.') {
						done(result.errorMessage);
					} else if (result.errorCode !== '0') {
						done(result.errorMessage);
					} else {
						done();
					}
				});
			});
			
		});
		
	});
	
	describe('#FIND', function(){
		var filemaker = filemakerTests(loginHeaders);
		
		before(function (done) {
			filemaker.login(function(error, result) {
				if(error) {
					done(error);
				} else {
					done();
				}
			});
		});
		
		it('Find Records', function(done) {
			var params = {
				"query" : [{"Video" : "Video", "omit" : "false"}],
				"sort" : [{"fieldName" : "Last", "sortOrder" : "descend"}],
				"offset" : "10",
				"range" : "10",
				"portal" : {
					"Portal1" : {
						"offset" : "1",
						"range" : "2"
					}					
				}
			};
			filemaker.find(layout, params, function(error, result) {
				if(!error) {
					if (result.errorCode !== '0') {
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
	
	describe('#GLOBAL FIELDS', function(){
		var filemaker;
		
		before(function (done) {
			filemaker = filemakerTests(loginHeaders);
			filemaker.login(function(error, result) {
				if(error) {
					done(error);
				} else {
					done();
				}
			});
		});
		
		it('Set Global Fields', function(done) {
			var params = {
				"globalFields" : {
					"global1" : "Test1",
					"global2" : "Test2"
				}
			};
			filemaker.setGlobals(layout, params, function(error, result) {
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