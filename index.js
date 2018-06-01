/**
 * FileMaker-Rest-Connector Module
 * @module filemaker
 * @author Connect Solutions <info@connect.solutions>
 * @requires module:request
 *
 */
"use strict";
// We require the ability to perform CUSTOM HTTP Requests to the FileMaker Server
const request = require("request");
// Building of the filemaker object
var filemaker = (options) => {
    /**
     * Create the Constructor Object
     * @namespace [[{Object}] Self]
     * @property {Object} self							Values passed to Constructor
     * @property {Object} self.options					Default values for constructor object
     * @property {String} self.protocol					Default Protocol
     * @property {String} self.ip						Default IP
     * @property {String} self.solution					Default Solution Name
     * @property {Object} self.headers					Default Headers
     * @property {Object} self.body						Default Body
     * @property {Object} self.selfSignedCertificate	Use of Self Signed Certificate
     * @property {Object} self.result					Result object passed back from API
     * @property {String} self.token					Authentication token passed back from API
     * @property {String} self.recordId					Last Record Id when request dealt with a single record.
     */
    var self = this;
    self.options = options || {};
    self.protocol = !self.options.protocol ? {} : self.options.protocol;
    self.ip = !self.options.ip ? {} : self.options.ip;
    self.solution = !self.options.solution ? {} : self.options.solution;
    self.headers = !self.options.headers ? {} : self.options.headers;
    self.body = !self.options.body ? {} : self.options.body;
    self.APIversion = !self.options.APIversion ? "v1" : self.options.APIversion;
    self.selfSignedCertificate =
        self.options.selfSignedCertificate == true
            ? {
                rejectUnauthorized: false
            }
            : {
                rejectUnauthorized: true
            };
    self.result = {};
    self.token = "";
    self.recordId = "";
    delete self.options;
    /* helper functions */
    function setApiScripts(params, url) {
        if (params) {
            if (params.hasOwnProperty("preRequestScript")) {
                url += `script.prerequest=${params.preRequestScript}&script.prerequest.param=${params.preRequestScriptParams}`;
            }
        }
        return url;
    }
    /**
     * Construct all the functions used in the module
     * @namespace [[{Object}] Methods]
     * @memberof self
     */
    const Methods = {
        /**
         * @function getProtocol
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @returns {String} The protocol to use in the API call.
         */
        getProtocol: () => {
            return self.protocol;
        },
        /**
         * @function getIp
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @returns {String} The IP to use in the API call.
         */
        getIp: () => {
            return self.ip;
        },
        /**
         * @function getSolution
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @returns {String} The Solution name to use in the API call.
         */
        getSolution: () => {
            return self.solution;
        },
        /**
         * @function getHeaders
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @returns {Object} The Headers needed to be passed to the API during a call.
         */
        getHeaders: () => {
            return self.headers;
        },
        /**
         * @function setHeaders
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @param {Object} headers	Headers to be set
         * @returns {Void}
         */
        setHeaders: (headers) => {
            self.headers = headers;
        },
        /**
         * @function getBody
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @returns {Object} The Header Body needed to be passed to the API during a call.
         */
        getBody: () => {
            return self.body;
        },
        /**
         * @function setBody
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @param {Object} body		Body Headers to be set
         * @returns {Void}
         */
        setBody: (body) => {
            self.body = body;
        },
        /**
         * @function getSelfSignedCertificate
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @returns {Boolean} Use of Self Signed Certificate for SSL. i.e.
         */
        getSelfSignedCertificate: () => {
            return self.selfSignedCertificate;
        },
        /**
         * @function getResult
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @returns {Boolean} If user is using Self Signed Certficate
         */
        getResult: () => {
            return self.result;
        },
        /**
         * @function setResult
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @param {Object} result	API Result Object
         * @returns {Void}
         */
        setResult: (result) => {
            self.result = result;
        },
        /**
         * @function getToken
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @returns {String} API Auth Token
         */
        getToken: () => {
            return self.token;
        },
        /**
         * @function setToken
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @param {String} token	API Auth Token
         * @returns {Void}
         */
        setToken: (token) => {
            self.token = token;
            token = token;
        },
        /**
         * @function getRecordId
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @returns {String} Last Internal Record ID used
         */
        getRecordId: () => {
            return self.recordId;
        },
        /**
         * @function setRecordId
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @param {Object} recordId	Last Internal Record ID used.
         * @returns {Void}
         */
        setRecordId: (recordId) => {
            self.recordId = recordId;
        },
        /**
         * @function getVersion
         */
        getAPIversion: () => {
            return self.APIversion;
        },
        /**
         * @function login
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @description Authenticates with the FileMaker server and saves an Auth Token.
         * @callback callback
         * @param {Object} error		Error object passed back from request call
         * @param {Object} body			FileMaker Response Object
         * @todo FileMaker allows for oAuth to occur, this still needs to be implemented.
         */
        login: () => {
            // TODO: Handle oAuth
            // TODO: Handle oAuth
            // TODO: Handle oAuth
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/sessions`;
            return new Promise((resolve, reject) => {
                // Make the API Call
                request({
                    method: "POST",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true,
                    body: self.getBody()
                }, (error, response, body) => {
                    if (!error) {
                        // TODO: Need to handle any non 202 HTTP response
                        self.setResult(body);
                        self.setToken(body.response.token);
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * @function logout
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @description Logs out the User from the FileMaker Server
         * @callback callback
         * @param {Object} error		Error object passed back from request call
         * @param {Object} body			FileMaker Response Object
         */
        logout: () => {
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/sessions/${self.getToken()}`;
            // Set Headers and Body
            self.setHeaders({
                Authorization: "Bearer " + self.getToken()
            });
            return new Promise((resolve, reject) => {
                // Make the API Call
                request({
                    method: "DELETE",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        self.setToken("");
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        validToken: (layout) => {
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/layouts/${layout}/records?_offset=1&_limit=1`;
            // Set Headers and Body
            self.setHeaders({
                Authorization: "Bearer " + self.getToken()
            });
            return new Promise((reject, resolve) => {
                // Make the API Call
                request({
                    method: "GET",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * @function create
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @description Will create a FileMaker Record
         * @param {String} layout		Layout name to use.
         * @param {Object} params		Parameters to be used, in this case, data you wish to set the record with.
         * 								Leave empty for a BLANK record.
         * @callback callback
         * @param {Object} error		Error object passed back from request call
         * @param {Object} body			FileMaker Response Object
         * @returns {Void}
         */
        create: (layout, params) => {
            /**
             * This will contain the data to be passed to the record creation
             */
            var body = {};
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/layouts/${layout}/records`;
            if (params === null || params === undefined) {
                // EMPTY Record being created
                body = {
                    fieldData: {}
                };
            }
            else {
                body = params;
            }
            // Set Headers and Body
            self.setHeaders({
                "Content-Type": "application/json",
                Authorization: "Bearer " + self.getToken()
            });
            self.setBody(body);
            return new Promise((resolve, reject) => {
                // Make the API Call
                request({
                    method: "POST",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true,
                    body: self.getBody()
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        self.setRecordId(body.recordId);
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * @function edit
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @description Will edit a FileMaker Record
         * @param {String} layout		Layout name to use.
         * @param {String} recordId		Internal FileMaker Record Id
         * @param {Object} params		Parameters to be used, in this case, data you wish to set the record with.
         * @callback callback
         * @param {Object} error		Error object passed back from request call
         * @param {Object} body			FileMaker Response Object
         * @todo Handle the modId optional parameter stated in FileMaker REST API Docs
         */
        edit: (layout, recordId, params) => {
            // TODO: Handle the modId optional parameter
            // TODO: Handle the modId optional parameter
            // TODO: Handle the modId optional parameter
            /**
             * This will contain the data to be passed to perform the edit
             */
            var body = {};
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/layouts/${layout}/records/${recordId}`;
            // Set Headers and Body
            body = params;
            self.setHeaders({
                "Content-Type": "application/json",
                Authorization: "Bearer " + self.getToken()
            });
            self.setBody(body);
            return new Promise((reject, resolve) => {
                // Make the API Call
                request({
                    method: "PATCH",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true,
                    body: self.getBody()
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        self.setRecordId("");
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * @function delete
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @description Will delete a FileMaker Record
         * @param {String} layout		Layout name to use.
         * @param {String} recordId		Internal FileMaker Record Id
         * @callback callback
         * @param {Object} error		Error object passed back from request call
         * @param {Object} body			FileMaker Response Object
         */
        delete: (layout, recordId, params) => {
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/layouts/${layout}/records/${recordId}?`;
            url = setApiScripts(params, url);
            // Set Headers and Body
            self.setHeaders({
                Authorization: "Bearer " + self.getToken()
            });
            return new Promise((reject, resolve) => {
                // Make the API Call
                request({
                    method: "DELETE",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        self.setRecordId("");
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * @function getRecord
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @description Will return the record with the recordID parameter
         * @param {String} layout		Layout name to use.
         * @param {Object} params		Portal Object information
         * @param {String} recordId		Internal FileMaker Record Id
         */
        getRecord: (layout, params, recordId) => {
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/layouts/${layout}/records/${recordId}?`;
            // Portal Settings
            if (params) {
                if (params.hasOwnProperty("portal")) {
                    var keys = Object.keys(params.portal);
                    url += "portal=" + JSON.stringify(keys) + "&";
                    var portal;
                    for (var index in keys) {
                        portal = keys[index];
                        if (params.portal[portal].hasOwnProperty("offset")) {
                            url +=
                                "_offset." +
                                    portal +
                                    "=" +
                                    params.portal[portal].offset +
                                    "&";
                        }
                        if (params.portal[portal].hasOwnProperty("limit")) {
                            url +=
                                "_limit." +
                                    portal +
                                    "=" +
                                    params.portal[portal].limit +
                                    "&";
                        }
                    }
                }
            }
            // Set Headers and Body
            self.setHeaders({
                Authorization: "Bearer " + self.getToken()
            });
            return new Promise((reject, resolve) => {
                // Make the API Call
                request({
                    method: "GET",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        self.setRecordId(body.data[0].recordId);
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * @function getRecords
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @description Will return an object with all record data
         * @param {String} layout		Layout name to use.
         * @param {Object} params		Query Parameters
         * @param {Object} error		Error object passed back from request call
         * @param {Object} body			FileMaker Response Object
         */
        getRecords: (layout, params) => {
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/layouts/${layout}`;
            // Format the Query Parameters into the API URL
            if (params) {
                url += "/records?";
                if (params.hasOwnProperty("offset")) {
                    url += "_offset=" + params.offset + "&";
                }
                if (params.hasOwnProperty("limit")) {
                    url += "_limit=" + params.limit + "&";
                }
                if (params.hasOwnProperty("sort")) {
                    url += "_sort=" + JSON.stringify(params.sort) + "&";
                }
                if (params.hasOwnProperty("portal")) {
                    var keys = Object.keys(params.portal);
                    url += "portal=" + JSON.stringify(keys) + "&";
                    var portal;
                    for (var index in keys) {
                        portal = keys[index];
                        if (params.portal[portal].hasOwnProperty("offset")) {
                            url +=
                                "_offset." +
                                    portal +
                                    "=" +
                                    params.portal[portal].offset +
                                    "&";
                        }
                        if (params.portal[portal].hasOwnProperty("limit")) {
                            url +=
                                "_limit." +
                                    portal +
                                    "=" +
                                    params.portal[portal].limit +
                                    "&";
                        }
                    }
                }
            }
            // Set Headers and Body
            self.setHeaders({
                Authorization: "Bearer " + self.getToken()
            });
            return new Promise((reject, resolve) => {
                // Make the API Call
                request({
                    method: "GET",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * @function find
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @description Will return an object with the records from the find data
         * @param {String} layout		Layout name to use.
         * @param {Object} params		Find Parameters
         * @callback callback
         * @param {Object} error		Error object passed back from request call
         * @param {Object} body			FileMaker Response Object
         * @returns {Void}
         */
        find: (layout, params) => {
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/layouts/${layout}/_find?`;
            /**
             * This will contain the parameters to be passed to perform the find
             */
            var body = {};
            // Format the Find Parameters into a JSON object to be passed to the API
            if (params) {
                if (params.hasOwnProperty("query")) {
                    body.query = params.query;
                }
                if (params.hasOwnProperty("offset")) {
                    body.offset = params.offset;
                }
                if (params.hasOwnProperty("limit")) {
                    body.limit = params.limit;
                }
                if (params.hasOwnProperty("sort")) {
                    body.sort = params.sort;
                }
                if (params.hasOwnProperty("portal")) {
                    var keys = Object.keys(params.portal);
                    body.portal = keys;
                    var portal;
                    for (var index in keys) {
                        portal = keys[index];
                        if (params.portal[portal].hasOwnProperty("offset")) {
                            body["_offset." + portal] =
                                params.portal[portal].offset;
                        }
                        if (params.portal[portal].hasOwnProperty("limit")) {
                            body["_limit." + portal] =
                                params.portal[portal].limit;
                        }
                    }
                }
            }
            // Set Headers and Body
            self.setHeaders({
                "Content-Type": "application/json",
                Authorization: "Bearer " + self.getToken()
            });
            self.setBody(body);
            return new Promise((resolve, reject) => {
                // Make the API Call
                request({
                    method: "POST",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true,
                    body: self.getBody()
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * @function setGlobals
         * @author Steven McGill <steven@whitespacesystems.co.uk>
         * @description Will set global values in this User Token's instance
         * @param {String} layout		Layout name to use.
         * @param {Object} params		Global Fields
         * @callback callback
         * @param {Object} error		Error object passed back from request call
         * @param {Object} body			FileMaker Response Object
         * @returns {Void}
         */
        setGlobals: (layout, params) => {
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/globals`;
            // Set Headers and Body
            self.setHeaders({
                Authorization: "Bearer " + self.getToken()
            });
            self.setBody(params);
            return new Promise((reject, resolve) => {
                // Make the API Call
                request({
                    method: "PUT",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true,
                    body: self.getBody()
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * @function uploadToContainer
         * @author Connect Solutions <info@connect.solutions>
         * @description Will upload to a container field
         * @param {String} layout		Layout name to use.
         * @param {Object} params		Global Fields
         */
        uploadToContainer: (layout, recordId, field, field_repetition, params) => {
            /**
             * URL to submit to the FileMaker REST API
             */
            var url = `${self.getProtocol()}://${self.getIp()}/fmi/data/${self.getAPIversion()}/databases/${self.getSolution()}/layouts/${layout}/records/${recordId}/containers/${field}/${field_repetition}`;
            // Set Headers and Body
            self.setHeaders({
                "Content-type": "multipart/form-data ",
                Authorization: "Bearer " + self.getToken()
            });
            self.setBody(params);
            return new Promise((reject, resolve) => {
                // Make the API Call
                request({
                    method: "POST",
                    url: url,
                    headers: self.getHeaders(),
                    agentOptions: self.getSelfSignedCertificate(),
                    json: true,
                    body: self.getBody()
                }, (error, response, body) => {
                    if (!error) {
                        self.setResult(body);
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        }
    };
    /* Declare all the functions available. */
    self.getProtocol = Methods.getProtocol;
    self.getIp = Methods.getIp;
    self.getSolution = Methods.getSolution;
    self.getHeaders = Methods.getHeaders;
    self.setHeaders = Methods.setHeaders;
    self.getBody = Methods.getBody;
    self.setBody = Methods.setBody;
    self.getSelfSignedCertificate = Methods.getSelfSignedCertificate;
    self.getResult = Methods.getResult;
    self.setResult = Methods.setResult;
    self.getToken = Methods.getToken;
    self.setToken = Methods.setToken;
    self.getRecordId = Methods.getRecordId;
    self.setRecordId = Methods.setRecordId;
    self.login = Methods.login;
    self.logout = Methods.logout;
    self.getAPIversion = Methods.getAPIversion;
    self.validToken = Methods.validToken;
    self.create = Methods.create;
    self.edit = Methods.edit;
    self.delete = Methods.delete;
    self.getRecords = Methods.getRecords;
    self.getRecord = Methods.getRecord;
    self.find = Methods.find;
    self.setGlobals = Methods.setGlobals;
    self.uploadToContainer = Methods.uploadToContainer;
    return self;
};
/** filemaker object returned */
module.exports = filemaker;
