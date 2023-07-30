import { Component } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  title: string | undefined = 'Página Teste';
  username: string | undefined = 'Usuário';

}
