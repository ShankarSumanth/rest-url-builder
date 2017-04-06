export class RestURLBuilder {

  private baseURL: string;
  private namedParameters = {};
  private queryParameters = {};
  private firstQueryInvoked: boolean;
  private parameterMatcher = /(:\b\D\w*)/g;

  constructor() { }

  buildRestURL(url: string): RestURLBuilder {
    let baseURL = url.substr(0, url.indexOf('?'));
    if (baseURL.length > 0) {
      this.baseURL = baseURL;
      let queryParamURL = url.substr(url.indexOf('?') + 1, url.length);
      this.extractQueryParameters(queryParamURL);
    } else {
      this.baseURL = url;
    }
    this.extractNamedParameters(this.baseURL);
    return this;
  }

  extractNamedParameters(url: string) {
    let parameters = url.match(this.parameterMatcher);
    if (parameters) {
      parameters.forEach(value => this.namedParameters[value] = null);
    }
  }

  extractQueryParameters(url: string) {
    let parameters = url.match(this.parameterMatcher);
    parameters.forEach(value => this.queryParameters[value] = null);
  }

  setNamedParameter(paramName: string, value: string) {
    this.setParameter(paramName, value, this.namedParameters);
  }

  getNamedParameters() {
    return this.namedParameters;
  }

  setQueryParameter(paramName: string, value: string) {
    this.setParameter(paramName, value, this.queryParameters);
  }

  getQueryParameters() {
    return this.queryParameters;
  }

  private setParameter(paramName: string, value: string, paramType: any) {
    if (':' + paramName in paramType) {
      paramType[':' + paramName] = value;
      return this;
    }
    throw 'parameter ' + paramName + ' does not exist in the url: ' + this.baseURL;
  }

  get(): string {
    let restURL = this.baseURL;
    restURL = this.substitueNamedParameters(this.baseURL);
    restURL = this.substitueQueryParameters(restURL);
    return restURL;
  }

  private substitueNamedParameters(url: string): string {
    return this.substitute(url, this.namedParameters, true, false);
  }

  private substitueQueryParameters(url: string) {
    return this.substitute(url, this.queryParameters, false, true);
  }

  private substitute(url, parameters, substituteALL, isQueryParam) {
    Object.keys(parameters)
      .forEach(parameter => {
        let value = parameters[parameter];
        if (!value && substituteALL) {
          throw new Error('The parameter ' + parameter + ' has not been set');
        }

        if (!isQueryParam) {
          url = url.replace(parameter, value);
        }

        if (isQueryParam && value) {
          if (!this.firstQueryInvoked) {
            this.firstQueryInvoked = true;
            url = url + '?' + parameter.slice(1) + '=' + value;
          } else {
            url = url + '&' + parameter.slice(1) + '=' + value;
          }
        }
      });
    return url;
  }

  getBaseURL(): string {
    return this.baseURL;
  }

}
