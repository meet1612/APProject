import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CategorySerService } from '../../../sevices/category-ser.service';
import { Category } from '../category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  catid:number;
  catname:string;
    id:number;
    catarr:Category[]=[];
    newcatname:string;
  constructor(private _ser:CategorySerService,private _acroute:ActivatedRoute,private _send:Router) { }

  ngOnInit() {
    this.id=this._acroute.snapshot.params['id'];
    this._ser.getCategoryById(this.id).subscribe(
      (data:Category[])=>{
        this.catarr=data;
        this.catid=data[0].CategoryID;
        this.catname=data[0].CategoryNAME;
      }
    );
  }
  onSave(){
    if (this.catarr.find(x => x.CategoryNAME == this.newcatname)) {
      alert("You enter the same name");
    }
      else{
      this._ser.updateCategory(new Category(this.catid,this.newcatname)).subscribe(
      (data:any)=>{
      this._send.navigate(['/category']);
      }
    );
    }
  }
  onBack(){
    this._send.navigate(['/category']);
  }
}
