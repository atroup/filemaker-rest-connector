'use strict';

var request = require('request');

var filemaker = (options) => {
	var self = this;
	self.options = options || {};
	self.protocol = (!self.options.protocol) ? {} : self.options.protocol;
	self.ip = (!self.options.ip) ? {} : self.options.ip;
	self.solution = (!self.options.solution) ? {} : self.options.solution;
	self.headers = (!self.options.headers) ? {} : self.options.headers;
	self.body = (!self.options.body) ? {} : self.options.body;
	self.result = {};
	self.token = '';
	delete self.options;
	
	var Methods = {
		getProtocol: () => {
			return self.protocol;
		},
		getIp: () => {
			return self.ip;
		},
		getSolution: () => {
			return self.solution;
		},
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

		login: (callback) => {
			// TODO: Handle oAuth
			// TODO: Handle oAuth
			// TODO: Handle oAuth
			request({
				"method" : 'POST',
				"url" : self.getProtocol()+'://'+self.getIp()+'/fmi/rest/api/auth/'+self.getSolution(),
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
		
		logout: (callback) => {
			request({
				"method" : 'DELETE',
				"url" : self.getProtocol()+'://'+self.getIp()+'/fmi/rest/api/auth/'+self.getSolution(),
				"headers" : {"FM-Data-token" : self.getToken()},
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
		
		getRecords: (layout, params, callback) => {
			var url = self.getProtocol()+'://'+self.getIp()+'/fmi/rest/api/record/'+self.getSolution()+'/'+layout+'?';
			
			if(params) {
				if(params.hasOwnProperty('offset')) {
					url += 'offset='+params.offset+'&';
				}
				if(params.hasOwnProperty('range')) {
					url += 'range='+params.range+'&';
				}
				if(params.hasOwnProperty('sort')) {
					url += 'sort='+JSON.stringify(params.sort)+'&';
				}
				if(params.hasOwnProperty('portal')) {
					var keys = Object.keys(params.portal);
					url += 'portal='+JSON.stringify(keys)+'&';
					var portal;
					for(var index in keys) {
						portal = keys[index];
						if(params.portal[portal].hasOwnProperty('offset')){
							url += 'offset.'+portal+'='+params.portal[portal].offset+'&'
						}
						if(params.portal[portal].hasOwnProperty('range')){
							url += 'range.'+portal+'='+params.portal[portal].range+'&'
						}
					}
				}
			}
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
		},
		
		getRecord: (layout, params, recordId, callback) => {
			var url = self.getProtocol()+'://'+self.getIp()+'/fmi/rest/api/record/'+self.getSolution()+'/'+layout+'/'+recordId+'?';
			
			if(params) {
				if(params.hasOwnProperty('portal')) {
					var keys = Object.keys(params.portal);
					url += 'portal='+JSON.stringify(keys)+'&';
					var portal;
					for(var index in keys) {
						portal = keys[index];
						if(params.portal[portal].hasOwnProperty('offset')){
							url += 'offset.'+portal+'='+params.portal[portal].offset+'&'
						}
						if(params.portal[portal].hasOwnProperty('range')){
							url += 'range.'+portal+'='+params.portal[portal].range+'&'
						}
					}
				}
			}
			
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
		},
		
		find: (layout, params, callback) => {
			var url = self.getProtocol()+'://'+self.getIp()+'/fmi/rest/api/find/'+self.getSolution()+'/'+layout+'/';
			var body = {};
			if(params) {
				if(params.hasOwnProperty('query')){
					body.query = params.query;
				}
				if(params.hasOwnProperty('offset')) {
					body.offset = params.offset;
				}
				if(params.hasOwnProperty('range')) {
					body.range = params.range;
				}
				if(params.hasOwnProperty('sort')) {
					body.sort = params.sort;
				}
				if(params.hasOwnProperty('portal')) {
					var keys = Object.keys(params.portal);
					body.portal = keys;
					var portal;
					for(var index in keys) {
						portal = keys[index];
						if(params.portal[portal].hasOwnProperty('offset')){
							body["offset."+portal] = params.portal[portal].offset;
						}
						if(params.portal[portal].hasOwnProperty('range')){
							body["range."+portal] = params.portal[portal].range;
						}
					}
				}
			}
			
			self.setBody(body);
			
			request({
				"method" : 'POST',
				"url" : url,
				"headers" : {"FM-Data-token" : self.getToken()},
				"agentOptions" : {
					"rejectUnauthorized" : false
				},
				"json" : true,
				"body" : self.getBody()
			}, (error, response, body) => {
				if(!error) {
					self.setResult(body);
					callback(null, body);
				} else {
					callback(error);
				}
			});
		},
		
		setGlobals: (layout, params, callback) => {
			var url = self.getProtocol()+'://'+self.getIp()+'/fmi/rest/api/global/'+self.getSolution()+'/'+layout+'/';

			self.setBody(params);
			
			request({
				"method" : 'PUT',
				"url" : url,
				"headers" : {"FM-Data-token" : self.getToken()},
				"agentOptions" : {
					"rejectUnauthorized" : false
				},
				"json" : true,
				"body" : self.getBody()
			}, (error, response, body) => {
				if(!error) {
					console.log(response);
					self.setResult(body);
					callback(null, body);
				} else {
					callback(error);
				}
			});
		}
	};
	
	self.getProtocol 	= Methods.getProtocol;
	self.getIp		 	= Methods.getIp;
	self.getSolution 	= Methods.getSolution;
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
	self.getRecord		= Methods.getRecord;
	self.find			= Methods.find;
	self.setGlobals		= Methods.setGlobals;
	
	return self;
};

module.exports = filemaker;