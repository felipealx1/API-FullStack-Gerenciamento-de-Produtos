import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtosService: ProdutosService) {}

  listarProdutos(): void {
    this.produtosService.listarProdutos().subscribe(
      retorno => this.produtos = retorno
    );
  }

  ngOnInit(): void {
    this.listarProdutos();
  }
}
