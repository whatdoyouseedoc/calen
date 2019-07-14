import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGenService {

  constructor() {
  }

  getId(len = 16) {
    return [...Array(len)].fill(0).map(() => (~~(Math.random() * 36)).toString(36)).join('');
  }
}
