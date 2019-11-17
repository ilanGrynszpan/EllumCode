import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestUrlsService } from './rest-urls.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http: HttpClient,
    private rest_urls: RestUrlsService) { }

  fetch_cpf(cpf:any):Observable<any> { // based on code found in https://ionicacademy.com/ionic-4-app-api-calls/

    return this.http.get(this.rest_urls.rest_urls.usuario + "get_user_id/?cpf=" + cpf).pipe(
      map(res=>res)
    );
  }
  

  fetch_services(user_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.servico + "get_service_list/?user_id=" + user_id).pipe(
      map(res=>res['service_list'])
    );
  }

  fetch_my_payments(service_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.pagamento + "get_pending_payments_for_service/?id_servico=" + service_id).pipe(
      map(res=>res['payment_list'])
    );
  }
}
