import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { RestUrlsService } from './rest-urls.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserInformationInterfaceService {

  constructor(private http: HttpClient,
    private rest_urls: RestUrlsService) { }

  user_retrieve(user_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.usuario + user_id + "/").pipe(
      map(res=>res)
    );
  }

  user_delete(user_id:any):Observable<any> {

    return this.http.delete(this.rest_urls.rest_urls.usuario + user_id + "/").pipe(
      map(res=>res)
    );
  }

  user_create(user_data:any):Observable<any> {

    return this.http.post(this.rest_urls.rest_urls.usuario, user_data).pipe(
      map(res=>res)
    );
  }

  user_get_id(user_cpf:any):Observable<any> {

    let url = this.rest_urls.rest_urls.usuario + "get_user_id/?cpf=" + user_cpf + "/";
    console.log(url);

    return this.http.get(url).pipe(
      map(res=>res['user_id'])
    );
  }

  user_auth(user_data:any):Observable<any> {

    return this.http.post(this.rest_urls.rest_urls.usuario + "123/auth_user/", user_data).pipe(
      map(res=>res)
    );
  }

  user_set_banking_information(user_id:any, bank_data:any):Observable<any> {

    return this.http.post(this.rest_urls.rest_urls.usuario + user_id + "/set_banking_information/", bank_data).pipe(
      map(res=>res)
    );
  }

  user_set_logged(user_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.usuario + user_id + "/set_user_logged/").pipe(
      map(res=>res)
    );
  }

  user_set_unlogged(user_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.usuario + user_id + "/set_user_unlogged/").pipe(
      map(res=>res)
    );
  }
}
