import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { UserPageComponent } from './components/user-page/user-page.component';
import { PostComponent } from '../articles-page/components/post/post.component';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { EditArticleResolver } from './resolvers/edit-article.resolver';

const routes: Routes = [
    {
        path: '',
        component: UserPageComponent
    },
    {
        path: 'Article/:id',
        component: PostComponent
    },
    {
        path: 'ArticleEditor',
        component: ArticleEditorComponent
    },
    {
        path: 'ArticleEditor/Update/:id',
        component: ArticleEditorComponent,
        resolve: {
            editArticle: EditArticleResolver
          }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }