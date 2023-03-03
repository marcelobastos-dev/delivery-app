import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { IProduct } from '@modules/products/models/product.interface'
import { IFind } from '@shared/models/find.interface'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  find(searchText: string, category: string, page: number = 1): Observable<IFind<IProduct>> {
    let params = new HttpParams()
    params = params.set('sort', 'name:asc')
    params = params.set('pagination[page]', page).set('pagination[pageSize]', 4)

    if (searchText) {
      params = params.set('filters[name][$contains]', searchText)
    }

    if (category) {
      params = params.set('filters[category][$eq]', category)
    }

    const url = `${environment.api.backend}/api/products`
    return this.http.get<IFind<IProduct>>(url, { params })
  }
}
