import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from '../../services/facture.service'; // Import FactureService
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {
  billerId: number = 0; // Initialiser avec une valeur par défaut
  billId: number = 0; // Initialiser avec une valeur par défaut
  code: string = '';
  correctCode: string = '123456'; // Code SMS simulé

  constructor(private route: ActivatedRoute, private router: Router,
    private factureService: FactureService 
  ) {}

  ngOnInit() {
    const billerIdParam = this.route.snapshot.paramMap.get('billerId');
    const billIdParam = this.route.snapshot.paramMap.get('billId');

    if (billerIdParam !== null) {
      this.billerId = +billerIdParam;
    }

    if (billIdParam !== null) {
      this.billId = +billIdParam;
    }
  }

  verifyCode() {
    const clientId = '39d227c3-f711-4e45-90bd-6c5ec9f9aa12';
    if (this.code === this.correctCode) {
      console.log('Code verified');
      this.factureService.effectuerPaiement(clientId, this.billId).subscribe(
        response => {
          alert('Insufficient balance');
          console.error('Payment failed:')
        },
        (error: HttpErrorResponse) => {
          alert('Payment successful');
          this.router.navigate(['/pay-bill', this.billerId]);        }
      );
    } else {
      console.log('Invalid code');
      alert('Code invalide. Veuillez réessayer.');
    }
  }

  cancelVerification() {
    this.router.navigate(['/pay-bill', this.billerId]);
  }
}
