import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ContingencyPage } from '../contingency/contingency';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContingencyPage;

  constructor() {

  }
}
