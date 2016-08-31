myApp.factory('EntryService', ['$rootScope',
  function($rootScope) {

    var entries = [];

    return {
      getEntries: function() {
        return entries; // returns an array of entries
      },
      setEntries: function(value) {
        entries = value;
      }
    };

  }
]);
