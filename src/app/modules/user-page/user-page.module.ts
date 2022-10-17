import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './user-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

//Components
import { UserPageComponent } from './components/user-page/user-page.component';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { RequestService } from '../articles-page/services/request.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    UserPageComponent,
    ArticleEditorComponent,
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [RequestService]
})
export class UserPageModule { }
