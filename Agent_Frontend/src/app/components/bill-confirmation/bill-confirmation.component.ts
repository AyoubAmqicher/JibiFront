import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bill-confirmation',
  templateUrl: './bill-confirmation.component.html',
  styleUrls: ['./bill-confirmation.component.css']
})
export class BillConfirmationComponent implements OnInit {
  biller: any;
  bill: any;

  billers = [
    { id: 1, name: 'Maroc Telecom', description: 'TÉLÉPHONIE ET INTERNET SIM', icon: 'assets/maroc-telecom.png' },
    { id: 2, name: 'IAM FACTURES', description: 'PRODUIT INTERNET SIM', icon: 'assets/iam-factures.png' },
    { id: 3, name: 'REDAL', description: 'FACTURES REDAL', icon: 'assets/redal.png' },
    { id: 4, name: 'AMENDIS TANGER', description: 'FACTURES AMENDIS TANGER', icon: 'assets/amendis-tanger.png' },
    { id: 5, name: 'LYDEC', description: 'FACTURES LYDEC', icon: 'assets/lydec.png' },
    { id: 6, name: 'AMENDIS TETOUAN', description: 'FACTURES AMENDIS TÉTOUAN', icon: 'assets/amendis-tetouan.png' },
  ];

  unpaidBills = [
    { id: 1, billerId: 1, reference: '12345', description: 'Facture Internet', amount: '200 DH', date: '01-01-2023' },
    { id: 2, billerId: 1, reference: '67890', description: 'Facture Téléphone', amount: '100 DH', date: '02-01-2023' },
    { id: 3, billerId: 2, reference: '11223', description: 'Facture Internet', amount: '300 DH', date: '03-01-2023' },
    { id: 4, billerId: 2, reference: '44556', description: 'Facture Téléphone', amount: '150 DH', date: '04-01-2023' },
    { id: 5, billerId: 3, reference: '78901', description: 'Facture Eau', amount: '250 DH', date: '05-01-2023' },
    { id: 6, billerId: 3, reference: '22334', description: 'Facture Électricité', amount: '400 DH', date: '06-01-2023' },
    { id: 7, billerId: 4, reference: '55667', description: 'Facture Eau', amount: '350 DH', date: '07-01-2023' },
    { id: 8, billerId: 4, reference: '88990', description: 'Facture Électricité', amount: '200 DH', date: '08-01-2023' },
    { id: 9, billerId: 5, reference: '99887', description: 'Facture Eau', amount: '180 DH', date: '09-01-2023' },
    { id: 10, billerId: 5, reference: '77665', description: 'Facture Électricité', amount: '220 DH', date: '10-01-2023' },
    { id: 11, billerId: 6, reference: '33445', description: 'Facture Eau', amount: '290 DH', date: '11-01-2023' },
    { id: 12, billerId: 6, reference: '66778', description: 'Facture Électricité', amount: '310 DH', date: '12-01-2023' },
    // Ajoutez plus de factures impayées pour d'autres créanciers si nécessaire
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const billerIdParam = this.route.snapshot.paramMap.get('billerId');
    const billIdParam = this.route.snapshot.paramMap.get('billId');
    const billerId = billerIdParam ? +billerIdParam : null;
    const billId = billIdParam ? +billIdParam : null;
    this.biller = this.billers.find(b => b.id === billerId);
    this.bill = this.unpaidBills.find(b => b.id === billId);
  }

  confirmPayment() {
    // Logique pour envoyer le code SMS
    console.log('Sending SMS for bill:', this.bill);
    this.router.navigate(['/verify-code', this.biller.id, this.bill.id]);
  }

  cancelPayment() {
    this.router.navigate(['/pay-bill', this.biller.id]);
  }
}
