import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atualizar-produto',
  templateUrl: './atualizar-produto.component.html',
  styleUrls: ['./atualizar-produto.component.css']
})
export class AtualizarProdutoComponent implements OnInit {
  produtoForm = new FormGroup({
    id: new FormControl(0),
    nome: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    codigoBarras: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    preco: new FormControl(0, [Validators.required]),
    img: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtosService.listarProdutos().subscribe(produtos => {
        const produto = produtos.find(p => p.id === +id);
        if (produto) {
          this.produtoForm.setValue(produto);
        }
      });
    }
  }

  enviar(): void {
    const produto: Produto = this.produtoForm.value as Produto;
    this.produtosService.atualizarProduto(produto).subscribe(
      () => {
        Swal.fire(
          'Parabéns',
          'Produto Atualizado com Sucesso',
          'success'
        );
        this.router.navigate(['/home']);
      },
      (error) => {
        Swal.fire('Ops, Erro!', error.message, 'error');
      }
    );
  }
}
