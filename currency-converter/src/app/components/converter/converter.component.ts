import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  @ViewChild('inputAmt') inputEl!: ElementRef;
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'INR';
  exchangeRate: number = 0;
  convertedAmount: number = 0;
  currencies: string[] = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AUD'];

  constructor(private currencyService: CurrencyService) { }


  ngAfterViewInit() {
    this.inputEl.nativeElement.focus()
  }

  convertCurrency() {
    if (!this.amount || this.amount <= 0) {
      alert('Enter a valid amount');
      return;
    }

    this.currencyService.getExchangeRates(this.fromCurrency).subscribe((data) => {
      if (data && data.conversion_rates) {
        this.exchangeRate = data.conversion_rates[this.toCurrency];
        this.convertedAmount = this.amount * this.exchangeRate;
      }
    }, (error) => {
      console.error('Error fetching exchange rates:', error);
      alert('Error fetching exchange rates. Please try again.');
    });
  }
}
