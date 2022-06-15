import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClinet: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private url(requestParameters: Partial<RequestParameters>): string {
    return `${
      requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl
    }/${requestParameters.controller}${
      requestParameters.action ? `/${requestParameters.action}` : ''
    }`;
  }

  get<T>(
    requestParameter: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${id ? `/${id}` : ''}${
        requestParameter.queryString ? `?${requestParameter.queryString}` : ''
      }`;

    return this.httpClinet.get<T>(url, { headers: requestParameter.headers });
  }

  post<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${
        requestParameter.queryString ? `?${requestParameter.queryString}` : ''
      }
      `;

    return this.httpClinet.post<T>(url, body, {
      headers: requestParameter.headers,
    });
  }

  put<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${
        requestParameter.queryString ? `?${requestParameter.queryString}` : ''
      }`;

    return this.httpClinet.put<T>(url, body, {
      headers: requestParameter.headers,
    });
  }

  delete<T>(
    requestParameter: Partial<RequestParameters>,
    id: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}/${id}${
        requestParameter.queryString ? `?${requestParameter.queryString}` : ''
      }`;

    return this.httpClinet.delete<T>(url, {
      headers: requestParameter.headers,
    });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  queryString?: string;
}