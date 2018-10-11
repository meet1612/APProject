import { RouterModule,Routes } from '@angular/router';
import { CategoryComponent } from './admin/category/category.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EditCategoryComponent } from './admin/category/edit-category/edit-category.component';

const arr:Routes=[
{path:'',component:AdminHomeComponent},
{path:'category',component:CategoryComponent},
{path:'catedit/:id',component:EditCategoryComponent},
];
export const routing=RouterModule.forRoot(arr);
