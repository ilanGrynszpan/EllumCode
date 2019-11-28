import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { RestUrlsService } from './rest-urls.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalletInformationInterfaceService {

  constructor(private http: HttpClient,
    private rest_urls: RestUrlsService) { }

  wallet_retrieve(servico_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.carteira + servico_id + "/").pipe(
      map(res=>res['response'])
    );
  }
}