import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { IOrder } from '@modules/orders/models/order.interface'
import { IFindOne } from '@shared/models/find-one.interface'
import { IFind } from '@shared/models/find.interface'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  find(): Observable<IFind<IOrder>> {
    const url = `${environment.api.backend}/api/orders?populate=*`
    return this.http.get<IFind<IOrder>>(url)
  }
}
