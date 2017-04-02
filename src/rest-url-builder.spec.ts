import { RestURLBuilder } from './rest-url-builder';

describe('REST URL Builder', () => {
  let restUrlBuilder: RestURLBuilder;
  let testUrl = 'api.dev.talfinder.com/manageUser/:userId?hello=:hello&value=:value';

  beforeEach(() => { restUrlBuilder = new RestURLBuilder(); });

  it('should prepare rest url ', () => {
    let expectedBaseURL = testUrl.substr(0, testUrl.indexOf('?'));
    restUrlBuilder.buildRestURL(testUrl);
    let baseURL = restUrlBuilder.getBaseURL();
    expect(baseURL).toBe(expectedBaseURL);
  });

  it('should return given named parameters ', () => {
    let expectedNamedParams = {
      ':userId': null
    }
    restUrlBuilder.buildRestURL(testUrl);
    let actualNamedParams = restUrlBuilder.getNamedParameters();
    expect(actualNamedParams).toEqual(expectedNamedParams);
  });

  it('should return given query parameters', () => {
    let expectedQueryParams = {
      ':hello': null,
      ':value': null
    }
    restUrlBuilder.buildRestURL(testUrl);
    let actualQueryParams = restUrlBuilder.getQueryParameters();
    expect(actualQueryParams).toEqual(expectedQueryParams);
  })

  it('should produce final url with named parameters and values only', () => {
    let userValue = 'demo';
    restUrlBuilder.buildRestURL(testUrl);
    restUrlBuilder.setNamedParameter('userId', userValue);
    let replacedValues = restUrlBuilder.get();
    expect(replacedValues).toContain(userValue);
    expect(replacedValues).not.toContain('hello=:hello');
  });

  it('should produce final url with named parameters/values and given queryParameter only', () => {
    let userValue = 'demo';
    let hello = 10;
    restUrlBuilder.buildRestURL(testUrl);
    restUrlBuilder.setNamedParameter('userId', userValue);
    restUrlBuilder.setQueryParameter('hello', '' + 10);
    let replacedValues = restUrlBuilder.get();
    expect(replacedValues).toContain(userValue);
    expect(replacedValues).toContain('?');
    expect(replacedValues).toContain('hello=10');
    expect(replacedValues).not.toContain('&');
    expect(replacedValues).not.toContain('value=');
  });

  it('should have a base url when there are no query parameters', () => {
    let urlWithoutQueryParams = 'api.dev.talfinder.com/companies/:companyId/assessments';
    restUrlBuilder.buildRestURL(urlWithoutQueryParams);
    let baseURL = restUrlBuilder.getBaseURL();
    expect(baseURL).toBe(urlWithoutQueryParams);
  });
});
