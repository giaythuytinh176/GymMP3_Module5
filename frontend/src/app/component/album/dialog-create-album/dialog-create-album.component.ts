import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Album} from '../../../model/album/album';
import {AlbumService} from '../../../services/album/album.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {shake} from 'ng-animate';
import {FirebaseDialogAlbumComponent} from '../../firebase/firebaseDialogAlbum/firebaseDialogAlbum.component';

@Component({
    selector: 'app-dialog-create-album',
    templateUrl: './dialog-create-album.component.html',
    styleUrls: ['./dialog-create-album.component.css'],
    animations: [
        trigger('shake', [transition('* => *', useAnimation(shake))])
    ],
})
export class DialogCreateAlbumComponent implements OnInit {

    createAlbumDialogForm: FormGroup;
    shake: any;
    album: Album;

    constructor(
        public dialogRef: MatDialogRef<DialogCreateAlbumComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDataCreateAlbum,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private route: Router,
        private token: TokenStorageService,
        private albumService: AlbumService,
        public firebaseDialogAlbum: FirebaseDialogAlbumComponent,
    ) {
        // console.log(data);
    }

    ngOnInit(): void {
        this.createAlbumForm();

    }

    createAlbumSubmit(): void {
        if (this.createAlbumDialogForm.valid) {
            this.createAlbumDialogForm.value.image = this.firebaseDialogAlbum.fb;
            this.album = new Album(
                this.createAlbumDialogForm.value.album_name,
                this.createAlbumDialogForm.value.image,
            );
            // console.log(this.album);
            this.createAlbum(this.album);
        }
    }

    createAlbum(album: Album): void {
        this.albumService.createAlbum(album).subscribe((data: any) => {
                // console.log(data);
                if (data.error || data.status) {
                    this.token.signOut();
                    this.toastr.warning('You must login to create Album.');
                    this.route.navigate(['/user/login']);
                } else {
                    this.toastr.success('Add Album successfully!');
                }
            }, error => {
                console.log(error);
                if (error.error) {
                    if (JSON.parse(error.error).album_name) {
                        this.toastr.warning(JSON.parse(error.error).album_name);
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

    createAlbumForm(): void {
        this.createAlbumDialogForm = this.fb.group({
            album_name: ['', [Validators.required]],
            image: ['', [Validators.required]],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

export interface DialogDataCreateAlbum {
    id: number;
    album_name: string;
    image: string;
}
