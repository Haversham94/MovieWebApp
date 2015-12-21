'use strict';

class NavbarController {
    //start-non-standard
    menu = [{
            'title': 'Movies',
            'state': 'movies'
  },
        {
            'title': 'Search',
            'state': 'search'
  }];

    isCollapsed = true;
    //end-non-standard

    constructor() {}
}

angular.module('movieApp')
    .controller('NavbarController', NavbarController);
