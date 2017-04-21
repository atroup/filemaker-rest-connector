'use strict';

var request = require('request');

var filemaker = (options) => {
	var self = this;
	self.options = options || {};
	self.headers = (!self.options.headers) ? {} : self.options.headers;
	self.body = (!self.options.body) ? {} : self.options.body;
	self.result = {};
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

		authenticate: (protocol, ip, solution, callback) => {
			request({
				"method" : 'POST',
				"url" : protocol+'://'+ip+'/fmi/rest/api/auth/'+solution,
				"headers" : {
					"Content-Type" : 'application/json'
				},
				"agentOptions" : {
					"rejectUnauthorized" : false
				},
				"json" : true,
				"body" : {"user" : "StevenAdmin", "password" : "steven", "layout": "rest_contacts"}
			},
			(error, response, body) => {
				if(!error) {
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
	self.authenticate 	= Methods.authenticate;
	
	return self;
};

module.exports = filemaker;