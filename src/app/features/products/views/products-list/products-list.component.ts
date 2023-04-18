import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { IAppState } from '@core/state/app.state'
import { IProduct } from '@features/products/models/product.interface'
import { ProductsPageActions } from '@features/products/state/actions'
import { selectIsLoadingProducts } from '@features/products/state/selectors/products.selectors'
import { Store } from '@ngrx/store'
import { Meta } from '@shared/models/find.interface'
import { PRODUCT_CATEGORIES } from '@shared/models/product-categories.const'
import { ConfirmationService } from 'primeng/api'
import { Observable, Subject } from 'rxjs'
import { ProductsSearchForm } from './models/products-search-form.interface'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  // TODO: Use a container/presentation component behavior
  products: IProduct[] = []
  productsMeta: Meta = {
    pagination: {
      page: 1,
      pageCount: 1,
      pageSize: 4,
      total: 0,
    },
  }

  searchForm!: FormGroup

  categories = PRODUCT_CATEGORIES

  selectedProductId: number | null = null

  displayProductForm: boolean = false

  isLoadingProducts$!: Observable<boolean>

  private readonly destroy$ = new Subject<void>()

  constructor(private fb: FormBuilder, private store: Store<IAppState>, private confirmation: ConfirmationService) {}

  ngOnInit(): void {
    this.buildSearchForm()
    this.findProducts()

    this.isLoadingProducts$ = this.store.select(selectIsLoadingProducts)

    // this.store
    //   .select(selectProducts)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (products) => {
    //       this.products = products
    //     },
    //   })
  }

  buildSearchForm(): void {
    this.searchForm = this.fb.group({
      searchText: [''],
      category: [''],
      pageIndex: [1],
    })
  }

  pageChanged(pageEvent: any): void {
    const { first } = pageEvent || {}
    const pageIndex = !first ? 1 : first / this.productsMeta.pagination.pageSize + 1
    this.searchForm.patchValue({ pageIndex })
    this.findProducts()
  }

  submitSearch(): void {
    this.searchForm.patchValue({ pageIndex: 1 })
    this.findProducts()
  }

  findProducts(): void {
    // this.isLoadingProducts = true

    const payload = this.searchForm.value as ProductsSearchForm
    this.store.dispatch(ProductsPageActions.loadProducts(payload))

    // this.productsService
    //   .find(searchText, category, page)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: ({ data: products, meta }) => {
    //       this.products = products
    //       this.productsMeta = meta
    //       this.isLoadingProducts = false
    //     },
    //     error: () => {
    //       this.isLoadingProducts = false
    //     },
    //   })
  }

  confirmDeleteProduct(event: Event, productId: number): void {
    this.confirmation.confirm({
      target: event.target || undefined,
      message: 'Deseja mesmo deletar o item?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteProduct(productId)
      },
    })
  }

  deleteProduct(productId: number): void {
    // this.isLoadingProducts = true
    // this.productsService
    //   .delete(productId)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: () => {
    //       this.findProducts()
    //       this.message.add({ severity: 'success', detail: 'Produto removido' })
    //       this.isLoadingProducts = false
    //     },
    //     error: () => {
    //       this.isLoadingProducts = false
    //     },
    //   })
  }

  openProductForm(productId: number | null): void {
    this.selectedProductId = productId
    this.displayProductForm = true
  }

  closeProductForm(): void {
    this.selectedProductId = null
    this.displayProductForm = false
  }

  productSaved(saved: boolean): void {
    if (!saved) return

    if (this.selectedProductId === null) {
      this.searchForm.reset()
    }

    this.closeProductForm()
    this.findProducts()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
