import { Injectable } from '@angular/core';
import { Category } from '../admin/category/category';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorySerService {
  private cat_url:string="http://localhost:3000/category/";
  private cat1_url:string="http://localhost:3000/category1/";
  constructor(private _http:HttpClient) { }
  getAllCategory(){
    return this._http.get(this.cat_url);
  }
  addCategory(item:Category){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.cat_url,body,{headers:head1});
  }
  deleteAllCategory(item:Category[]){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.cat1_url,body,{headers:head1});
  }
  deleteOneCategory(id:number){
    return this._http.delete(this.cat_url+id);
  }
  updateCategory(item:Category){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.cat_url+item.CategoryID,body,{headers:head1});
  }
  getCategoryById(id){
    return this._http.get(this.cat_url+id);
  }
}
