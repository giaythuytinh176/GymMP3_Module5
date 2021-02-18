import {Component, Inject, OnInit} from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Singer} from '../../../model/singer/singer';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {SingerService} from '../../../services/singer/singer.service';
import {shake} from 'ng-animate';
import {FirebaseDialogSingerComponent} from '../../firebase/firebaseDialogSinger/firebaseDialogSinger.component';

@Component({
  selector: 'app-dialog-create-singer',
  styleUrls: ['dialog-create-singer.component.css'],
  templateUrl: 'create-singer-dialog.component.html',
  animations: [
    trigger('shake', [transition('* => *', useAnimation(shake))])
  ],
})
export class DialogCreateSingerComponent implements OnInit {

  createSingerDialogForm: FormGroup;
  shake: any;
  singer: Singer;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateSingerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCreateSinger,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private token: TokenStorageService,
    private singerService: SingerService,
    public firebaseDialogSinger: FirebaseDialogSingerComponent,
  ) {
    // console.log(data);
  }

  ngOnInit(): void {
    this.createSingerForm();

  }

  createSingerSubmit(): void {
    if (this.createSingerDialogForm.valid) {
      this.createSingerDialogForm.value.image = this.firebaseDialogSinger.fb;
      this.singer = new Singer(
        this.createSingerDialogForm.value.singer_name,
        this.createSingerDialogForm.value.image,
        this.createSingerDialogForm.value.description,
      );
      // console.log(this.singer);
      this.createSinger(this.singer);
    }
  }

  createSinger(singer: Singer): void {
    this.singerService.createSinger(singer).subscribe((data: any) => {
        // console.log(data);
        if (data.error || data.status) {
          this.token.signOut();
          this.toastr.warning('You must login to create Singer.');
          this.route.navigate(['/user/login']);
        } else {
          this.toastr.success('Add Singer successfully!');
        }
      }, error => {
        console.log(error);
        if (error.error) {
          if (JSON.parse(error.error).singer_name) {
            this.toastr.warning(JSON.parse(error.error).singer_name);
          } else if (JSON.parse(error.error).description) {
            this.toastr.warning(JSON.parse(error.error).description);
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

  createSingerForm(): void {
    this.createSingerDialogForm = this.fb.group({
      singer_name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogDataCreateSinger {
  id: number;
  singer_name: string;
  image: string;
  description: string;
}


