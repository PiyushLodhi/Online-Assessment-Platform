import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  
  
  @Input()topics: string[];
  @Input() difficultyList: string[];
  @Input() typeList: string[];

  @Output() onSearchEvent = new EventEmitter< {searchText: string}>();

  searchInput:string ;

  onSearchText() {
   
    this.onSearchEvent.emit({searchText: this.searchInput});

    
  }

  constructor() {}

  ngOnInit(): void {
    // console.log(this.topics);
  }
}
