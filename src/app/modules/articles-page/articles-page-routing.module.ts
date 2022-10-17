import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { PostsContainerComponent } from './components/posts-container/posts-container.component'

const routes: Routes = [
  {
    path: '',
    component: PostsContainerComponent
  },
  {
    path: 'article/:id',
    component: PostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesPageRoutingModule { }