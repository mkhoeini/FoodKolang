# AngularJS PouchDB Support

A simple wrapper for PouchDB, to make integration into AngularJS applications a breeze. So what does it do?

* It wraps PouchDB as a provider, allowing you to set global configuration before your dependencies are getting injected.
* It uses `$q`-based promises instead of callbacks: `db.put({...})` will return a promise with the results, and no longer accepts a callback as the last parameter. The same goes for all other operations that normally required callbacks.
* It will make sure Angular is aware of asynchronous updates. (It will make sure it uses `$rootScope.$apply()` in cases where it makes sense.)

## Usage

    var app = angular.module('app', ['pouchdb']);

    // Now if you dependency inject pouchdb in a service, you can:

    // Create a database
    var db = pouchdb.create('testdb');
    
    // Destroy a database
    pouchdb.destroy('testdb');
    
    // Add a document
    db.put({_id: 'foo', name: 'bar'});
    
    // Handle the output
    db.put({_id: 'foo', name: 'bar'}).then(function(response) {
        // Do something with the response
    }).catch(function(error) {
        // Do something with the error
    }).finally(function() {
        // Do something when everything is done
    });
    
    // To have a database as a dependency that you can inject in a service
    angular.factory('testdb', function(pouchdb) {
      return pouchdb.create('testdb');
    });
    
    angular.factory('testservice', function(testdb) {
        return {
            add: function(obj) { testdb.put(obj); }
        };
    });

    // To traverse and display all elements in a database (assuming that
    // database is exposed as testdb on the $scope object):
    <ul>
      <li pouch-repeat="item in testdb">
        {{item.name}}
      </li>
    </ul>

    // To traverse and display all elements in a database, and sort based on some fields
    <ul>
      <li pouch-repeat="person in persons order by name.first,name.last">
        {{item.name}}
      </li>
    </ul>

    
    
