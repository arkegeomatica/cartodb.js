/**
 *  Default widget content view:
 *
 *
 */

cdb.geo.ui.Widget.List.Content = cdb.geo.ui.Widget.Content.extend({

  _TEMPLATE: ' ' +
    '<div class="Widget-header">'+
      '<div class="Widget-title Widget-contentSpaced">'+
        '<h3 class="Widget-textBig" title="<%- title %>"><%- title %></h3>'+
      '</div>'+
      '<dl class="Widget-info">'+
        '<dt class="Widget-infoItem Widget-textSmaller Widget-textSmaller--upper"><%- itemsCount %> rows</dt>'+
      '</dl>'+
    '</div>'+
    '<div class="Widget-content Widget-content--noSidesMargin">'+
      '<div class="Widget-listWrapper js-content"></div>'+
    '</div>'+
    '<div class="Widget-footer js-footer"></div>',

  _PLACEHOLDER: ' ' +
    '<ul class="Widget-list Widget-list--withBorders">' +
      '<li class="Widget-listItem Widget-listItem--fake"></li>' +
      '<li class="Widget-listItem Widget-listItem--fake"></li>' +
      '<li class="Widget-listItem Widget-listItem--fake"></li>' +
      '<li class="Widget-listItem Widget-listItem--fake"></li>' +
    '</ul>',

  render: function() {
    this.clearSubViews();

    var template = _.template(this._TEMPLATE);
    var data = this.dataModel.getData();
    var isDataEmpty = _.isEmpty(data) || _.size(data) === 0;
    this.$el.html(
      template({
        title: this.viewModel.get('title'),
        itemsCount: !isDataEmpty ? data.length : '-'
      })
    );

    if (isDataEmpty) {
      this._addPlaceholder();
    } else {
      this._initViews();
    }

    return this;
  },

  _initViews: function() {
    var count = this.dataModel.getSize();

    // List view -> items view
    var list = new cdb.geo.ui.Widget.List.ItemsView({
      viewModel: this.viewModel,
      dataModel: this.dataModel
    });
    this.$('.js-content').html(list.render().el);
    this.addView(list);

    var isScrollList = (list.$el.get(0).scrollHeight - list.$el.outerHeight()) > 0;

    if (count > 4) {
      // Paginator
      var pagination = new cdb.geo.ui.Widget.List.PaginatorView({
        $target: list.$el
      });
      this.$('.js-footer').append(pagination.render().el);
      this.addView(pagination);
    }

    // Edges
    if (isScrollList) {
      var edges = new cdb.geo.ui.Widget.List.EdgesView({
        $target: list.$el
      });
      this.$('.js-content').append(edges.render().el);
      this.addView(edges);
    }
  }

});