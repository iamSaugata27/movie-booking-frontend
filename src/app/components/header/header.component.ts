import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(NgbNav, { static: true })
  ngbNav!: NgbNav;

  links = [
    { title: 'login', route: 'login' }
  ];
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.firstChild?.url.subscribe((url) => {
      // get url path
      const urlPath = url[url.length - 1]?.path;
      // select/set active tab
      this.ngbNav.select(urlPath);
    });
  }
}
