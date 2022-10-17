//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { ArticlesPageRoutingModule } from './articles-page-routing.module'
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule} from '@angular/material/menu';

//Components
import { PostsContainerComponent } from './components/posts-container/posts-container.component';
import { PostComponent } from './components/post/post.component'; 
import { TokenInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { AuthService } from '../auth/services/auth.service';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [PostsContainerComponent, PostComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ArticlesPageRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatMenuModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class ArticlesPageModule { }
