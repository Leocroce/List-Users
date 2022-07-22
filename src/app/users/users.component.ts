import { AddUserComponent } from './../add-user/add-user.component';
import { EditUserComponent } from './../edit-user/edit-user.component';
import { DialogosComponent } from './../dialogos/dialogos.component';
import { UsuariosServicoService } from './../servicos/usuarios-servico.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { catchError, debounceTime, distinctUntilChanged, filter, fromEvent, Observable, of, tap } from 'rxjs';
import { Usuarios } from '../models/usuarios';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  resultado$?: Observable<Usuarios | undefined>
  usuarios$: Observable<Usuarios[]>;
  color = 'accent'
  displayedColumns: string[] = ['icon', 'nome', 'email', 'editar'];

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private usuariosService: UsuariosServicoService,
    public dialogo: MatDialog
  ) {
    this.usuarios$ = usuariosService.listagemUsuarios()
    .pipe(
      catchError(error => {
        this.abrirDialogoErro("Erro ao carregar os usuários: " + error.status)
        return of([])
      })
    )
  }

  abrirDialogoErro(erroMsg: string){
    this.dialogo.open(DialogosComponent,{
      data: erroMsg
    })
  }

  abrirEdit(erroMsg: string) {
    this.dialogo.open(EditUserComponent, {
      data: erroMsg
    })
  }

  abrirAdd(erroMsg: string) {
    this.dialogo.open(AddUserComponent, {
      data: erroMsg
    })
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => {
          const query = this.searchInput.nativeElement.value;
          if (query) {
            this.resultado$ = this.usuariosService.pesquisar(query);
          } else {
            this.resultado$ = undefined;
          }
        })
      )
      .subscribe();
  }


  ngOnInit(): void {
  }

}
