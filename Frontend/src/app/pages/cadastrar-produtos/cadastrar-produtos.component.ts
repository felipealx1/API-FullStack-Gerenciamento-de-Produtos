import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent {
  constructor(private produtosService: ProdutosService){}

  produtoForm = new FormGroup({
    id:new FormControl(0),
    nome: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    codigoBarras: new FormControl('',[Validators.required, Validators.maxLength(1000)]),
    preco: new FormControl(0, [Validators.required]),
    img: new FormControl('', [Validators.required])
  });

  enviar(){
    const produto: Produto = this.produtoForm.value as Produto;
    this.produtosService.cadastrarProduto(produto).subscribe(
      (result) => {
        Swal.fire(
          'Parabéns',
          'Produto Cadastrado com Sucesso',
          'success'
        );
      },
      (error) => {
        const {message} = error;
        Swal.fire('Ops, Erro!', message, 'error')
      }
    );
  }

}

