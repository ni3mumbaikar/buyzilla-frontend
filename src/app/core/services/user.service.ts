import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { isGeneratorFunction } from 'util/types';
import { threadId } from 'worker_threads';
import { Router } from "@angular/router"
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User | null = null;
  userChangeSubject:Subject<User|null> = new Subject();

  constructor(private router: Router) {
    this.userChangeSubject.next(this.currentUser);
  }

  getState() {
    
      if (localStorage.getItem('buyzilla_user') != undefined) {
        this.currentUser = JSON.parse(localStorage.getItem('buyzilla_user')!)
        if (this.currentUser?.isAdmin) {
          this.router.navigate(['/admin'])
        }
        this.userChangeSubject.next(this.currentUser);
      }
    
  }
}
