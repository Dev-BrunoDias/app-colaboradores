import { NotificationService } from './../../services/notification.service';
import { CollaboratorService } from './../../services/collaborator.service';
import { Collaborator } from './../../models/collaborator';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/components/details/details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['foto', 'nome', 'email', 'cpf', 'cargo', 'setor', 'excluir',
   'editar', 'detalhes'];
  dataSource: Collaborator[] = [
  //   {
  //   nome: "Bruno Dias Lopes da Silva",
  //   email: "brunodlopes@gmail.com",
  //   cpf: "000.000.000-00",
  //   cargo: "Dev Junior",
  //   setor: "Desenvolvimento",
  //   estado: "Rio de Janeiro",
  //   cidade: "Niterói",
  //   remuneracao: 10000,
  //   dataNascimento: new Date(),
  //   fotoUrl: "https://avatars.githubusercontent.com/u/113553828?v=4"
  // }
  ];

  constructor(
    private collaboratorService: CollaboratorService,
    private notification: NotificationService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.initilizeTable();
  }

  private initilizeTable(): void {
    this.collaboratorService.findAll().subscribe(collaborators => {
      this.dataSource = collaborators;
    })
  }

  public deleteCollaborator(id: string): void {
    this.collaboratorService.deleteCollaborator(id).subscribe(Response => {
      this.notification.showMessage("Apagado.");
      this.initilizeTable();
    });
  }

  public openDatails(collaborator: Collaborator): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: collaborator
    });
  }

}
