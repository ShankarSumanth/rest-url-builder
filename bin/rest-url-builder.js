"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RestURLBuilder = (function () {
    function RestURLBuilder() {
        this.namedParameters = {};
        this.queryParameters = {};
        this.parameterMatcher = /(:\b\D\w*)/g;
    }
    RestURLBuilder.prototype.buildRestURL = function (url) {
        var baseURL = url.substr(0, url.indexOf('?'));
        if (baseURL.length > 0) {
            this.baseURL = baseURL;
            var queryParamURL = url.substr(url.indexOf('?') + 1, url.length);
            this.extractQueryParameters(queryParamURL);
        }
        else {
            this.baseURL = url;
        }
        this.extractNamedParameters(this.baseURL);
        return this;
    };
    RestURLBuilder.prototype.extractNamedParameters = function (url) {
        var _this = this;
        var parameters = url.match(this.parameterMatcher);
        if (parameters) {
            parameters.forEach(function (value) { return _this.namedParameters[value] = null; });
        }
    };
    RestURLBuilder.prototype.extractQueryParameters = function (url) {
        var _this = this;
        var parameters = url.match(this.parameterMatcher);
        parameters.forEach(function (value) { return _this.queryParameters[value] = null; });
    };
    RestURLBuilder.prototype.setNamedParameter = function (paramName, value) {
        this.setParameter(paramName, value, this.namedParameters);
    };
    RestURLBuilder.prototype.getNamedParameters = function () {
        return this.namedParameters;
    };
    RestURLBuilder.prototype.setQueryParameter = function (paramName, value) {
        this.setParameter(paramName, value, this.queryParameters);
    };
    RestURLBuilder.prototype.getQueryParameters = function () {
        return this.queryParameters;
    };
    RestURLBuilder.prototype.setParameter = function (paramName, value, paramType) {
        if (':' + paramName in paramType) {
            paramType[':' + paramName] = value;
            return this;
        }
        throw 'parameter ' + paramName + ' does not exist in the url: ' + this.baseURL;
    };
    RestURLBuilder.prototype.get = function () {
        var restURL = this.baseURL;
        restURL = this.substitueNamedParameters(this.baseURL);
        restURL = this.substitueQueryParameters(restURL);
        return restURL;
    };
    RestURLBuilder.prototype.substitueNamedParameters = function (url) {
        return this.substitute(url, this.namedParameters, true, false);
    };
    RestURLBuilder.prototype.substitueQueryParameters = function (url) {
        return this.substitute(url, this.queryParameters, false, true);
    };
    RestURLBuilder.prototype.substitute = function (url, parameters, substituteALL, isQueryParam) {
        var _this = this;
        Object.keys(parameters)
            .forEach(function (parameter) {
            var value = parameters[parameter];
            if (!value && substituteALL) {
                throw new Error('The parameter ' + parameter + ' has not been set');
            }
            if (!isQueryParam) {
                url = url.replace(parameter, value);
            }
            if (isQueryParam && value) {
                if (!_this.firstQueryInvoked) {
                    _this.firstQueryInvoked = true;
                    url = url + '?' + parameter.slice(1) + '=' + value;
                }
                else {
                    url = url + '&' + parameter.slice(1) + '=' + value;
                }
            }
        });
        return url;
    };
    RestURLBuilder.prototype.getBaseURL = function () {
        return this.baseURL;
    };
    return RestURLBuilder;
}());
exports.RestURLBuilder = RestURLBuilder;
//# sourceMappingURL=rest-url-builder.js.map