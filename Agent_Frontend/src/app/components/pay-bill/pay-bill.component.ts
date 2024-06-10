import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit {
  billers = [
    { id: 1, name: 'Maroc Telecom', description: 'TÉLÉPHONIE ET INTERNET SIM', icon: 'assets/maroc-telecom.png' },
    { id: 2, name: 'IAM FACTURES', description: 'PRODUIT INTERNET SIM', icon: 'assets/iam-factures.png' },
    { id: 3, name: 'REDAL', description: 'FACTURES REDAL', icon: 'assets/redal.png' },
    { id: 4, name: 'AMENDIS TANGER', description: 'FACTURES AMENDIS TANGER', icon: 'assets/amendis-tanger.png' },
    { id: 5, name: 'LYDEC', description: 'FACTURES LYDEC', icon: 'assets/lydec.png' },
    { id: 6, name: 'AMENDIS TETOUAN', description: 'FACTURES AMENDIS TÉTOUAN', icon: 'assets/amendis-tetouan.png' },
    { id: 7, name: 'Maroc22 Telecom', description: 'TÉLÉPHONIE ET INTERNET SIM', icon: 'assets/maroc-telecom.png' },
    { id: 8, name: 'IAM22 FACTURES', description: 'PRODUIT INTERNET SIM', icon: 'assets/iam-factures.png' },
    { id: 9, name: 'REDAL22', description: 'FACTURES REDAL', icon: 'assets/redal.png' },
    { id: 10, name: 'AMENDIS22 TANGER', description: 'FACTURES AMENDIS TANGER', icon: 'assets/amendis-tanger.png' },
    // Add more billers as needed
  ];

  searchQuery: string = '';
  filteredBillers = [...this.billers];
  currentPage = 1;
  itemsPerPage = 6;
  paginatedBillers = this.filteredBillers.slice(0, this.itemsPerPage);

  get totalPages() {
    return Math.ceil(this.filteredBillers.length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.updatePaginatedBillers();
  }

  filterBillers() {
    this.filteredBillers = this.billers.filter(biller =>
      biller.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      biller.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePaginatedBillers();
  }

  updatePaginatedBillers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedBillers = this.filteredBillers.slice(start, start + this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedBillers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedBillers();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedBillers();
  }
}
