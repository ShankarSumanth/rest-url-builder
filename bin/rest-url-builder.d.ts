export declare class RestURLBuilder {
    private baseURL;
    private namedParameters;
    private queryParameters;
    private firstQueryInvoked;
    private parameterMatcher;
    constructor();
    buildRestURL(url: string): RestURLBuilder;
    extractNamedParameters(url: string): void;
    extractQueryParameters(url: string): void;
    setNamedParameter(paramName: string, value: string): void;
    getNamedParameters(): {};
    setQueryParameter(paramName: string, value: string): void;
    getQueryParameters(): {};
    private setParameter(paramName, value, paramType);
    get(): string;
    private substitueNamedParameters(url);
    private substitueQueryParameters(url);
    private substitute(url, parameters, substituteALL, isQueryParam);
    getBaseURL(): string;
}
