import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { IProduct } from '@modules/products/models/product.interface'
import { ProductsService } from '@modules/products/services/products/products.service'
import { IFind, Meta } from '@shared/models/find.interface'
import { PRODUCT_CATEGORIES } from '@shared/models/product-categories.const'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
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

  isLoadingProducts: boolean = false

  private readonly destroy$ = new Subject<void>()

  constructor(private fb: FormBuilder, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.buildSearchForm()
    this.findProducts()
  }

  buildSearchForm(): void {
    this.searchForm = this.fb.group({
      searchText: [''],
      category: [''],
    })
  }

  findProducts(pageEvent?: any): void {
    this.isLoadingProducts = true

    const { searchText, category } = this.searchForm.value
    const { first } = pageEvent || {}
    const page = !first ? 1 : first / this.productsMeta.pagination.pageSize + 1

    this.productsService
      .find(searchText, category, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data: products, meta }) => {
          this.products = products
          this.productsMeta = meta
          this.isLoadingProducts = false
        },
        error: () => {
          this.isLoadingProducts = false
        },
      })
  }

  clearSearchForm(): void {
    this.searchForm.reset()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
