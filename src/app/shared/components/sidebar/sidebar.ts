import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  menuList = signal<any>([]);
ngOnInit(): void {
    this.getMenuList()
}
getMenuList =async ()=>{
  const variables={}

}
}
