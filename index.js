'use strict';

var request = require('request');

var filemaker = (options) => {
	var self = this;
	self.options = options || {};
	self.headers = (!self.options.headers) ? {} : self.options.headers;
	self.body = (!self.options.body) ? {} : self.options.body;
	self.result = {};
	self.token = '';
	delete self.options;
	
	var Methods = {
		getHeaders: () => {
			return self.headers;
		},
		setHeaders: (headers) => {
			self.headers = headers;
		},
		getBody: () => {
			return self.body;
		},
		setBody: (body) => {
			self.body = body;
		},
		getResult: () => {
			return self.result;
		},
		setResult: (result) => {
			self.result = result;
		},
		getToken: () => {
			return self.token;
		},
		setToken: (token) => {
			self.token = token;
		},

		login: (protocol, ip, solution, callback) => {
			// TODO: Handle oAuth
			// TODO: Handle oAuth
			// TODO: Handle oAuth
			request({
				"method" : 'POST',
				"url" : protocol+'://'+ip+'/fmi/rest/api/auth/'+solution,
				"headers" : self.getHeaders(),
				"agentOptions" : {
					"rejectUnauthorized" : false
				},
				"json" : true,
				"body" : self.getBody()
			}, (error, response, body) => {
				if(!error) {
					self.setResult(body);
					self.setToken(body.token);
					callback(null, body);
				} else {
					callback(error);
				}
			});
		},
		
		logout: (protocol, ip, solution, callback) => {
			request({
				"method" : 'DELETE',
				"url" : protocol+'://'+ip+'/fmi/rest/api/auth/'+solution,
				"headers" : self.getHeaders(),
				"agentOptions" : {
					"rejectUnauthorized" : false
				},
				"json" : true,
			}, (error, response, body) => {
				if(!error) {
					self.setResult(body);
					self.setToken('');
					callback(null, body);
				} else {
					callback(error);
				}
			});
		},
		
		getRecords: (protocol, ip, solution, layout, offset, callback) => {
			var url = protocol+'://'+ip+'/fmi/rest/api/record/'+solution+'/'+layout+'?';
			url += (offset) ? 'offset='+offset+'&' : '';
			request({
				"method" : 'GET',
				"url" : url,
				"headers" : {"FM-Data-token" : self.getToken()},
				"agentOptions" : {
					"rejectUnauthorized" : false
				},
				"json" : true
			}, (error, response, body) => {
				if(!error) {
					self.setResult(body);
					callback(null, body);
				} else {
					callback(error);
				}
			});
		}
	};
	
	self.getHeaders 	= Methods.getHeaders;
	self.setHeaders 	= Methods.setHeaders;
	self.getBody 		= Methods.getBody;
	self.setBody 		= Methods.setBody;
	self.getResult		= Methods.getResult;
	self.setResult		= Methods.setResult;
	self.getToken		= Methods.getToken;
	self.setToken		= Methods.setToken;
	self.login		 	= Methods.login;
	self.logout		 	= Methods.logout;
	self.getRecords		= Methods.getRecords;
	
	return self;
};

module.exports = filemaker;