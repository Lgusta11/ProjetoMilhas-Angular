import { Component, OnInit } from '@angular/core';
import { DepoimentoService } from 'src/app/home/services/depoimento.service';
import { Depoimento } from 'src/app/core/types/type';

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.scss']
})
export class DepoimentosComponent implements OnInit {
  depoimentos: Depoimento[] = [];
  constructor(private service: DepoimentoService) {
  }
  ngOnInit(): void {
    this.service.listar().subscribe(
      res => {
        this.depoimentos = res;
      }
    );
  }
}
