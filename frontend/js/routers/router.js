/*jshint unused: false */
/*global window, $, Backbone, document, arangoCollectionModel*/
/*global arangoHelper,dashboardView,arangoDatabase, _*/

(function () {
  "use strict";

  window.Router = Backbone.Router.extend({
    routes: {
      "": "demo"
    },

    demo: function (collection) {
      if (!collection) {
        collection = "flights";
      }
      if (!this.demoView) {
        this.demoView = new window.DemoView({
          collectionName: collection
        });
      }

      this.demoView.render();
    }

  });

}());
