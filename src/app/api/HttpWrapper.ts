import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpWrapper {

  private prodUrl = 'http://84.83.208.7:8080/';
  private headers: HttpHeaders = new HttpHeaders();
  private body: string | undefined;
  private endpoint: string | undefined;

  constructor(private http: HttpClient) {
  }

  public setHeaders(headers: HttpHeaders): HttpWrapper {
    if (headers != null) {
      this.headers = headers;
      return this;
    }
    throw new Error('Headers cannot be null');
  }

  public addHeader(key: string, value: any): HttpWrapper {
    if (this.headers != null) {
      this.headers = this.headers.append(key, value);
      return this;
    }
    throw new Error('Failed to append on the header');
  }

  public setContentType(type: ContentType): HttpWrapper {
    if (this.headers != null) {
      this.headers = this.headers.delete('Content-Type');
      this.headers = this.headers.append('Content-Type', type.toString());
      return this;
    }
    throw new Error('Failed to set content type');
  }

  public setEndpoint(endpoint: string): HttpWrapper {
    if (endpoint !== null && endpoint !== '') {
      this.endpoint = endpoint;
      return this;
    }
    throw new Error('Endpoint cannot be empty or null');
  }

  // @ts-ignore
  public setBody(body: any): HttpWrapper {
    if (body !== null && body !== '') {
      this.body = body;
      return this;
    }
    throw new Error('Body cannot be empty or null');
  }

  // tslint:disable-next-line:typedef
  public get(callback: (data: any) => any, error?: (err: any) => any) {
    this.http.get(this.prodUrl + this.endpoint, {headers: this.headers})
      .toPromise().then(callback).catch(error);
  }

  // tslint:disable-next-line:typedef
  public post(callback: (data: any) => any, error?: (err: any) => any) {
    this.http.post(this.prodUrl + this.endpoint, this.body, {headers: this.headers})
      .toPromise().then(callback).catch(error);
  }

}

/**
 * The content type headers.
 */
export enum ContentType {
  JSON = 'application/json',
  PLAIN = 'text/plain',
  FORM_DATA = 'multipart/form-data',
  FORM = 'application/x-www-form-urlencoded'
}
