var $ = require('jquery');
var _ = require('underscore');
var d3 = require('d3');
var log = require('cdb.log');
var View = require('cdb/core/view');

/**
 * Animate between two values
 */
module.exports = View.extend({

  initialize: function() {
  },

  animateFromValues: function(from, to, className, template, opts) {
    var self = this;

    var format = opts.formatter || d3.format('0,000');
    var templateData = opts.templateData || {};

    this.$(className).prop('counter', from).stop().animate({ counter: to }, {
      duration: opts.animationSpeed || 500,
      easing: opts.easingMethod || 'swing',
      step: function (i) {
        value = (_.isNaN(i) || i === undefined) ? (opts.defaultValue || 0) : opts.formatter(i);
        var data = _.extend({ value: value }, templateData);
        $(this).text(template(data));
      }
    });
  },

  animateFromCurrentValue: function(value, className, template, opts) {
    var self = this;

    var to   = value;
    var from = +this.$(className).text();
    console.log(to, from);

    var format = opts.formatter || d3.format('0,000');
    var templateData = opts.templateData || {};

    this.$(className).prop('counter', from).stop().animate({ counter: to }, {
      duration: opts.animationSpeed || 500,
      easing: opts.easingMethod || 'swing',
      step: function (i) {
        value = (_.isNaN(i) || i === undefined) ? (opts.defaultValue || 0) : opts.formatter(i);
        var data = _.extend({ value: value }, templateData);
        $(this).text(template(data));
      }
    });
  },

  animateValue: function(model, what, className, template, opts) {
    var self = this;

    var to   = model.get(what);
    var from = model.previous(what) || 0;

    var format = opts.formatter || d3.format('0,000');
    var templateData = opts.templateData || {};

    this.$(className).prop('counter', from).stop().animate({ counter: to }, {
      duration: opts.animationSpeed || 500,
      easing: opts.easingMethod || 'swing',
      step: function (i) {
        value = (_.isNaN(i) || i === undefined) ? (opts.defaultValue || 0) : opts.formatter(i);
        var data = _.extend({ value: value }, templateData);
        $(this).text(template(data));
      }
    });
  }
});
