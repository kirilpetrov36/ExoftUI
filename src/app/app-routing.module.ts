import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './modules/admin/admin.module';
import { AdminGuard } from './modules/admin/guards/admin.guard';
import { ArticlesPageModule } from './modules/articles-page/articles-page.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserPageModule } from './modules/user-page/user-page.module';

import { SharedGuard } from './shared/guards/shared.guard';

const routes: Routes = [
	{
		path: 'articles',
		loadChildren: () => import('./modules/articles-page/articles-page.module').then(m => ArticlesPageModule)
	},
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.module').then(m => AuthModule)
	},
	{
		path: 'myBlog',
		loadChildren: () => import('./modules/user-page/user-page.module').then(m => UserPageModule),
		canActivate: [SharedGuard]
	},
	{
		path: 'admin',
		loadChildren: () => import('./modules/admin/admin.module').then(m => AdminModule),
		canActivate: [AdminGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [SharedGuard]
})
export class AppRoutingModule { }
