import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  biller: any;
  formValues: { [key: string]: string } = {};
  showUnpaidBills: boolean = false;

  billers = [
    { id: 1, name: 'Maroc Telecom', description: 'TÉLÉPHONIE ET INTERNET SIM', icon: 'assets/maroc-telecom.png', fields: ['Numéro de téléphone ou numéro de contrat', 'Code de facturation'] },
    { id: 2, name: 'IAM FACTURES', description: 'PRODUIT INTERNET SIM', icon: 'assets/iam-factures.png', fields: ['Numéro de client', 'Code de facturation'] },
    { id: 3, name: 'REDAL', description: 'FACTURES REDAL', icon: 'assets/redal.png', fields: ['Numéro de contrat ou numéro de compteur', 'Date de la facture'] },
    { id: 4, name: 'AMENDIS TANGER', description: 'FACTURES AMENDIS TANGER', icon: 'assets/amendis-tanger.png', fields: ['Numéro de contrat', 'Code de facturation'] },
    { id: 5, name: 'LYDEC', description: 'FACTURES LYDEC', icon: 'assets/lydec.png', fields: ['Numéro de client', 'Date de la facture'] },
    { id: 6, name: 'AMENDIS TETOUAN', description: 'FACTURES AMENDIS TÉTOUAN', icon: 'assets/amendis-tetouan.png', fields: ['Numéro de contrat', 'Code de facturation'] },
  ];

  unpaidBills = [
    { id: 1, billerId: 1, reference: '12345', description: 'Facture Internet', amount: '200 DH' },
    { id: 2, billerId: 1, reference: '67890', description: 'Facture Téléphone', amount: '100 DH' },
    { id: 3, billerId: 2, reference: '11223', description: 'Facture Internet', amount: '300 DH' },
    { id: 4, billerId: 2, reference: '44556', description: 'Facture Téléphone', amount: '150 DH' },
    { id: 5, billerId: 3, reference: '78901', description: 'Facture Eau', amount: '250 DH' },
    { id: 6, billerId: 3, reference: '22334', description: 'Facture Électricité', amount: '400 DH' },
    { id: 7, billerId: 4, reference: '55667', description: 'Facture Eau', amount: '350 DH' },
    { id: 8, billerId: 4, reference: '88990', description: 'Facture Électricité', amount: '200 DH' },
    { id: 9, billerId: 5, reference: '99887', description: 'Facture Eau', amount: '180 DH' },
    { id: 10, billerId: 5, reference: '77665', description: 'Facture Électricité', amount: '220 DH' },
    { id: 11, billerId: 6, reference: '33445', description: 'Facture Eau', amount: '290 DH' },
    { id: 12, billerId: 6, reference: '66778', description: 'Facture Électricité', amount: '310 DH' },
    // Ajoutez plus de factures impayées pour d'autres créanciers si nécessaire
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    this.biller = this.billers.find(b => b.id === id);
  }

  onSubmit() {
    console.log('Form submitted', this.formValues);
    this.showUnpaidBills = true;
  }

  getUnpaidBills() {
    return this.unpaidBills.filter(bill => bill.billerId === this.biller.id);
  }

  payBill(billId: number) {
    this.router.navigate(['/pay-bill', this.biller.id, 'bill', billId]);
  }
  cancelPayment() {
    this.router.navigate(['/pay-bill']);
  }
}
