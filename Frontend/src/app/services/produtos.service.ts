import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private url:string = 'http://localhost:8080/api/produtos';

  constructor(private http:HttpClient) { }
  listarProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url);
  }

  cadastrarProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.url, produto);
  }

  editarProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(this.url, produto);
  }

  deletarProduto(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  atualizarProduto(produto: Produto): Observable<Produto> {
    const url = `${this.url}/${produto.id}`;
    return this.http.put<Produto>(url, produto);
  }

}
