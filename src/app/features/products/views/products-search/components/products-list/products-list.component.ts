import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IProduct } from '@features/products/models/product.interface'
import { IConfirmationEmitter } from '@shared/models/confirmation-emitter.interface'
import { Meta } from '@shared/models/find.interface'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  @Input() products: IProduct[] = []
  @Input() productsMeta!: Meta
  @Input() isLoadingProducts: boolean = false

  @Output('pageChanged') pageChangedEmitter = new EventEmitter<any>()
  @Output('editProduct') editProductEmitter = new EventEmitter<IProduct>()
  @Output('deleteProduct') deleteProductEmitter = new EventEmitter<IConfirmationEmitter<IProduct>>()

  pageChanged(event: any): void {
    this.pageChangedEmitter.emit(event)
  }

  editProduct(product: IProduct): void {
    this.editProductEmitter.emit(product)
  }

  deleteProduct(product: IProduct, event: Event): void {
    this.deleteProductEmitter.emit({ item: product, event })
  }
}
