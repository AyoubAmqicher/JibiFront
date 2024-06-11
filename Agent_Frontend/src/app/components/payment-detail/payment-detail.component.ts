import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from '../../services/facture.service';
import { Facture } from '../../model/facture.model'; // Import the Facture model



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

  unpaidBills: Facture[] = []; // Use the Facture type

  constructor(private route: ActivatedRoute, private router: Router,private factureService: FactureService) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    this.biller = this.billers.find(b => b.id === id);
  }

  onSubmit() {
    const clientId = '39d227c3-f711-4e45-90bd-6c5ec9f9aa12';
    this.factureService.getUnpaidFacturesByClientIdAndOperateurId(clientId, this.biller.id).subscribe(data => {
      this.unpaidBills = data;
      this.showUnpaidBills = true;
      console.log('Unpaid bills retrieved:', this.unpaidBills);
    });
  }

  getUnpaidBills() {
    return this.unpaidBills;
  }

  payBill(billId: number) {
    this.router.navigate(['/pay-bill', this.biller.id, 'bill', billId]);
  }
  cancelPayment() {
    this.router.navigate(['/pay-bill']);
  }
}
