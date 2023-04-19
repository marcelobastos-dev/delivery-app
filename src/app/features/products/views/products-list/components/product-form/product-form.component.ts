import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { validateFormGroup } from '@core/utils/validate-form-group'
import { IProduct } from '@features/products/models/product.interface'
import { ProductsService } from '@features/products/services/products/products.service'
import { PRODUCT_CATEGORIES } from '@shared/models/product-categories.const'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() productId!: number | null

  @Output() productSaved = new EventEmitter<boolean>()

  productForm!: FormGroup

  categories = PRODUCT_CATEGORIES.filter((category) => category.value !== '')

  private readonly destroy$ = new Subject<void>()

  constructor(private fb: FormBuilder, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.buildProductForm()

    if (this.productId) {
      this.findProduct(this.productId)
    }
  }

  buildProductForm(): void {
    this.productForm = this.fb.group({
      id: [null],
      attributes: this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: [0, [Validators.required]],
        category: [this.categories[0].value, [Validators.required]],
      }),
    })
  }

  findProduct(productId: number): void {
    this.productsService
      .findOne(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data: product }) => {
          this.patchProductFormValue(product)
        },
      })
  }

  submit(): void {
    if (!validateFormGroup(this.productForm)) {
      return
    }

    const product = this.productForm.getRawValue() as IProduct
    if (product.id) {
      this.updateProduct(product)
    } else {
      this.createProduct(product)
    }
  }

  createProduct(product: IProduct): void {
    this.productsService
      .create(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data: product }) => {
          this.patchProductFormValue(product)
          this.productSaved.emit(true)
        },
      })
  }

  updateProduct(product: Partial<IProduct>): void {
    this.productsService
      .update(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data: product }) => {
          this.patchProductFormValue(product)
          this.productSaved.emit(true)
        },
      })
  }

  patchProductFormValue(product: IProduct): void {
    this.productForm.patchValue(product)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
