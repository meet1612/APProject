import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { CategorySerService } from '../../sevices/category-ser.service';
import { Category } from '../category/category';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  catarr:Category[]=[];
  catname:string="";
  CategoryID:number;
  CategoryNAME:string="";
  flag:boolean = false;
  delArr:Category[]=[];
  i:number;
  constructor(private _send:Router,private _ser:CategorySerService) { }
  displayedColumns: string[] = ["select","name","Action"];
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._ser.getAllCategory().subscribe(
      (data:Category[])=>{
        this.catarr=data;
        this.dataSource.data=this.catarr;
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onEdit(item:Category){
    this._send.navigate(["/catedit", item.CategoryID]);
  }
  onsingledelete(item:Category){
      this._ser.deleteOneCategory(item.CategoryID).subscribe(
        (data:any)=>{
          this.catarr.splice(this.catarr.indexOf(item),1);
          this.dataSource.data=this.catarr;
        }
      );
  }

  onAddOnOff()
  {
    if(this.flag)
    {
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
  }
  onAdd(){
    console.log(this.catname);
  if (this.catarr.find(x => x.CategoryNAME == this.catname)) {
    alert("Already Exits");
  }

   else
  {
    if(this.catname.length>0){
    this._ser
      .addCategory(new Category(this.CategoryID, this.catname))
      .subscribe((data:any) => {
        this.catarr.push(new Category(data.insertId, this.catname));
        alert("added");
        this.dataSource.data = this.catarr;
      });
    }
    else{
      alert("Should Not Empty");
    }
  }
}
checkChange(item: Category) {
  if (this.delArr.find(x => x == item)) {
    this.delArr.splice(this.delArr.indexOf(item), 1);
  } else {
    this.delArr.push(item);
  }
}
deleteAll(){
  this._ser.deleteAllCategory(this.delArr).subscribe(

  (data:any)=>{
  for(this.i=0;this.i<this.delArr.length;this.i++)
  {
  if(this.catarr.find(x=>x==this.delArr[this.i]))
  {
  this.catarr.splice(this.catarr.indexOf(this.delArr[this.i]),1);
  }
  }
  this.ngOnInit();
  this.dataSource.data=this.catarr;
  }
)};
}

