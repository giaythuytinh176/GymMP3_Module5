import {Component, Inject, OnInit} from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {shake} from 'ng-animate';
import {Category} from '../../../model/category/category';
import {CategoryService} from '../../../services/category/caterory.service';
import {FirebaseDialogCategoryComponent} from '../../firebase/firebaseDialogCateogry/firebaseDialogCategory.component';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.css'],
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class CreateCategoryDialogComponent implements OnInit {

  createCategoryDialogForm: FormGroup;
  shake: any;
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCreateCategory,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private token: TokenStorageService,
    private categoryService: CategoryService,
    public firebaseDialogCategory: FirebaseDialogCategoryComponent,
  ) {
    // console.log(data);
  }

  ngOnInit(): void {
    this.createCategoryForm();

  }

  createCategorySubmit(): void {
    if (this.createCategoryDialogForm.valid) {
      this.createCategoryDialogForm.value.image = this.firebaseDialogCategory.fb;
      this.category = new Category(
        this.createCategoryDialogForm.value.category_name,
        this.createCategoryDialogForm.value.image,
      );
      // console.log(this.category);
      this.createCategory(this.category);
    }
  }

  createCategory(category: Category): void {
    this.categoryService.createCategory(category).subscribe((data: any) => {
        // console.log(data);
        if (data.error || data.status) {
          this.token.signOut();
          this.toastr.warning('You must login to create Category.');
          this.route.navigate(['/user/login']);
        } else {
          this.toastr.success('Add Category successfully!');
        }
      }, error => {
        console.log(error);
        if (error.error) {
          if (JSON.parse(error.error).category_name) {
            this.toastr.warning(JSON.parse(error.error).category_name);
          } else if (JSON.parse(error.error).image) {
            this.toastr.warning(JSON.parse(error.error).image);
          } else {
            this.toastr.warning('Something wrong.');
          }
        } else {
          this.toastr.warning('Something wrong.');
        }
      }
    );
  }

  createCategoryForm(): void {
    this.createCategoryDialogForm = this.fb.group({
      category_name: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogDataCreateCategory {
  id: number;
  category_name: string;
  image: string;
}
