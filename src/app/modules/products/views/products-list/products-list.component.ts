import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { IProduct } from '@modules/products/models/product.interface'
import { ProductsService } from '@modules/products/services/products/products.service'
import { IFind, Meta } from '@shared/models/find.interface'
import { PRODUCT_CATEGORIES } from '@shared/models/product-categories.const'
import { ConfirmationService, MessageService } from 'primeng/api'
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

  selectedProductId: number | null = null

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
