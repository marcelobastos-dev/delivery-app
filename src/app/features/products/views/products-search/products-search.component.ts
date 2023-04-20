import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { IProduct } from '@features/products/models/product.interface'
import { ProductsService } from '@features/products/services/products/products.service'
import { Meta } from '@shared/models/find.interface'
import { PRODUCT_CATEGORIES } from '@shared/models/product-categories.const'
import { ConfirmationService, MessageService } from 'primeng/api'
import { Subject, take, takeUntil } from 'rxjs'
import { IProductsSearchFilters } from './models/products-search-filters.interface'
import { IConfirmationEmitter } from '@shared/models/confirmation-emitter.interface'

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.scss'],
})
export class ProductsSearchComponent implements OnInit, OnDestroy {
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

  selectedProduct: IProduct | null = null

  isLoadingProducts: boolean = false
  displayProductForm: boolean = false

  private readonly destroy$ = new Subject<void>()

  constructor(
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private message: MessageService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.buildSearchForm()
    this.findProducts()
  }

  buildSearchForm(): void {
    this.searchForm = this.fb.group({
      searchText: [''],
      category: [''],
      pageIndex: [1],
    })
  }

  submitSearch(): void {
    this.searchForm.patchValue({ pageIndex: 1 })
    this.findProducts()
  }

  pageChanged(pageEvent: any): void {
    const { first } = pageEvent || {}
    const pageIndex = !first ? 1 : first / this.productsMeta.pagination.pageSize + 1
    this.searchForm.patchValue({ pageIndex })
    this.findProducts()
  }

  findProducts(): void {
    this.isLoadingProducts = true

    this.productsService
      .find(this.searchForm.value as IProductsSearchFilters)
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

  findProductById(productId: number): Promise<IProduct | null> {
    return new Promise((resolve, reject) => {
      this.productsService
        .findOne(productId)
        .pipe(take(1))
        .subscribe({
          next: ({ data: product }) => resolve(product),
          error: () => reject(null),
        })
    })
  }

  initProduct(): void {
    this.selectedProduct = null
    this.displayProductForm = true
  }

  async editProduct(product: IProduct) {
    this.selectedProduct = await this.findProductById(product.id)
    this.displayProductForm = true
  }

  async saveProduct(product: IProduct): Promise<void> {
    if (!product.id) {
      await this.createProduct(product)
    } else {
      await this.updateProduct(product)
    }

    this.productWasSaved()
  }

  async createProduct(product: IProduct): Promise<void> {
    return new Promise((resolve, reject) => {
      this.productsService
        .create(product)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => resolve(),
          error: () => reject(),
        })
    })
  }

  async updateProduct(product: Partial<IProduct>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.productsService
        .update(product)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => resolve(),
          error: () => reject(),
        })
    })
  }

  productWasSaved(): void {
    this.selectedProduct = null
    this.buildSearchForm()
    this.closeProductForm()
    this.findProducts()
  }

  confirmDeleteProduct({ item: product, event }: IConfirmationEmitter<IProduct>): void {
    this.confirmation.confirm({
      target: event.target || undefined,
      message: 'Deseja mesmo deletar o item?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteProduct(product.id)
      },
    })
  }

  deleteProduct(productId: number): void {
    this.isLoadingProducts = true

    this.productsService
      .delete(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.findProducts()
          this.message.add({ severity: 'success', detail: 'Produto removido' })
          this.isLoadingProducts = false
        },
        error: () => {
          this.isLoadingProducts = false
        },
      })
  }

  closeProductForm(): void {
    this.selectedProduct = null
    this.displayProductForm = false
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
