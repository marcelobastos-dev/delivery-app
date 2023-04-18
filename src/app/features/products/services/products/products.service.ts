import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { IProduct } from '@features/products/models/product.interface'
import { IFindOne } from '@shared/models/find-one.interface'
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

  findOne(productId: number): Observable<IFindOne<IProduct>> {
    const url = `${environment.api.backend}/api/products/${productId}`
    return this.http.get<IFindOne<IProduct>>(url)
  }

  create(product: IProduct): Observable<IFindOne<IProduct>> {
    const url = `${environment.api.backend}/api/products`
    return this.http.post<IFindOne<IProduct>>(url, { data: product.attributes })
  }

  update(product: Partial<IProduct>): Observable<IFindOne<IProduct>> {
    const url = `${environment.api.backend}/api/products/${product.id}`
    return this.http.put<IFindOne<IProduct>>(url, { data: product.attributes })
  }

  delete(productId: number): Observable<IFindOne<IProduct>> {
    const url = `${environment.api.backend}/api/products/${productId}`
    return this.http.delete<IFindOne<IProduct>>(url)
  }
}
