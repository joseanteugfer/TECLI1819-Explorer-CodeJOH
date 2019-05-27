import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from 'src/app/services/api.service';
import { OrderedTrip } from 'src/app/models/orderedTrip.model';
import { CONFIG } from 'src/app/app-config';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends TranslatableComponent implements OnInit {

  private payPalConfig: PayPalConfig;
  price: string;
  orderId: string

  constructor(translateService: TranslateService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) {
    super(translateService);
  }

  ngOnInit() {
    this.orderId = this.route.snapshot.queryParams['id'];
    this.getPriceFromOrderedTrip(this.orderId);
    this.initConfig();
  }

  initConfig() {
    //const total = this.route.snapshot.queryParams['total'];
    const orderid = this.orderId;

    this.payPalConfig = new PayPalConfig({
      currency: 'USD',
      clientId: CONFIG.apiKey,
      createOrder: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.price,
          },
        }]
      },
      advanced: {
        updateOrderDetails: {
          commit: true
        }
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log("Transaction was approved, but not authorized yet", data, actions);
        actions.order.get().then(details => {
          console.log('Order details: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.apiService.payOrderedTrip(orderid).subscribe(orderedTrip => {
          console.log(orderedTrip._id, orderedTrip.status);
        });
        this.router.navigateByUrl('/ordered-trips');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('Onclick');
      }
    });
  }

  getPriceFromOrderedTrip(orderId: string) {
    let price: string;
    //console.log('Obteniendo precio de orden con id:'+ orderId);
    this.apiService.getOrderedTripById(orderId).subscribe((orderedTrip) => {
      if(orderedTrip != null) {
        //console.log('Ordered Trip:'+ orderedTrip);
        this.apiService.getTripsFromTicker(orderedTrip[0].ticker).subscribe((trip) => {
          if (trip != null){
            //console.log('Viaje desde Ticker:'+ orderedTrip);

            this.price = trip[0].price.toString();
          }
        });
      }
    });
  }

}
