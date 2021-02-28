import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren:() => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path:'chat-room',
    loadChildren:()=> import('./chat-room/chat-room.module').then(m => m.ChatRoomModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
