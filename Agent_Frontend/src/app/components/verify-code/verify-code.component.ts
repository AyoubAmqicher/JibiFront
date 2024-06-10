import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

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
    if (this.code === this.correctCode) {
      console.log('Code verified');
      this.router.navigate(['/confirmation-success', this.billerId, this.billId]);
    } else {
      console.log('Invalid code');
      alert('Code invalide. Veuillez réessayer.');
    }
  }

  cancelVerification() {
    this.router.navigate(['/pay-bill', this.billerId]);
  }
}
