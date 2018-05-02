import { log } from 'util';
import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import * as myGlobals from '../../clases/constantes';

@Injectable()
export class MiHttpService {

  constructor( public http: Http ) { }

  public httpGetP ( url: string )
  {
    return this.http
    .get( myGlobals.SERVER + url )
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  public httpPostP( url: string )
  {
    return this.http
    .get( myGlobals.SERVER + url )
    .subscribe( data => {
      console.log( data );
      return data;
    });
  }

  public httpPostData( url: string , data:any, contentType:string ){
    let headersAux = new Headers({ 'Content-Type': contentType });
    let options = new RequestOptions({ headers: headersAux });
    return this.http
      .post( myGlobals.SERVER + url, data, options)
      .toPromise()
      .then( this.extractData )
      .catch( this.handleError )
  }

  public httpGetO ( url: string): Observable<Response>
  {
    return this.http.get( myGlobals.SERVER + url )
      .map( ( res: Response ) => res.json())
      .catch( ( err: any ) => Observable.throw(err.json().error || 'Server error'));
  }


  private extractData ( res: Response )
  {
    return res.json() || {};
  }

  private handleError ( error: Response | any )
  {
    return error;
  }
}
