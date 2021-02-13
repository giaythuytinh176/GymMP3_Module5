import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {CategoryService} from '../services/category/caterory.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryInfoByIDResolver implements Resolve<any> {
  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.categoryService.getCategoryInfo(route.params.id).pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
