import { Component, OnDestroy, OnInit } from '@angular/core'
import { IOrder } from '@modules/orders/models/order.interface'
import { OrdersService } from '@modules/orders/services/orders/orders.service'
import { Meta } from '@shared/models/find.interface'
import { MessageService } from 'primeng/api'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: IOrder[] = []
  ordersMeta: Meta = {
    pagination: {
      page: 1,
      pageCount: 1,
      pageSize: 4,
      total: 0,
    },
  }

  selectedOrderId: number | null = null

  isLoadingOrders: boolean = false
  displayOrderForm: boolean = false

  private readonly destroy$ = new Subject<void>()

  constructor(private message: MessageService, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.findOrders()
  }

  findOrders(): void {
    this.isLoadingOrders = true

    this.ordersService
      .find()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data: orders, meta }) => {
          this.orders = orders
          this.ordersMeta = meta

          console.log(this.orders)
          this.isLoadingOrders = false
        },
        error: () => {
          this.isLoadingOrders = false
        },
      })
  }

  showOrder(): void {
    this.message.add({ severity: 'info', detail: 'Disponível em breve 👨‍💻' })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
