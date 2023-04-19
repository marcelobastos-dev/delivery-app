import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { isValidFormGroup } from '@core/utils/validate-form-group'
import { IProduct } from '@features/products/models/product.interface'
import { ProductsService } from '@features/products/services/products/products.service'
import { PRODUCT_CATEGORIES } from '@shared/models/product-categories.const'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product!: IProduct | null

  @Output('saveProduct') saveProductEmitter = new EventEmitter<IProduct>()

  productForm!: FormGroup

  categories = PRODUCT_CATEGORIES.filter((category) => category.value !== '')

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildProductForm()

    if (this.product) {
      this.productForm.patchValue(this.product)
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

  submit(): void {
    if (isValidFormGroup(this.productForm)) {
      const product = this.productForm.getRawValue() as IProduct
      this.saveProductEmitter.emit(product)
    }
  }
}
