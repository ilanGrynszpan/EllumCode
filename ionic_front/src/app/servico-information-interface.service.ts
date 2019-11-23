import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { RestUrlsService } from './rest-urls.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicoInformationInterfaceService {

  constructor(private router: Router, 
    private http: HttpClient,
    private storage: Storage,
    private rest_urls: RestUrlsService) { }

  servico_retrieve(servico_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.servico + servico_id + "/").pipe(
      map(res=>res['response'])
    );
  }

  servico_create(servico_data:any):Observable<any> {

    return this.http.post(this.rest_urls.rest_urls.servico, servico_data).pipe(
      map(res=>res['response'])
    );
  }

  servico_delete(servico_id:any):Observable<any> {

    return this.http.delete(this.rest_urls.rest_urls.servico + servico_id + "/").pipe(
      map(res=>res['response'])
    );
  }

  servico_get_list(user_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.usuario + "get_service_list/?id_usuario=" + user_id).pipe(
      map(res=>res['response'])
    );
  }
}
