/*
 * grunt-bootstrap-prefix
 * https://github.com/Mickey-/grunt-bootstrap-prefix
 *
 * Copyright (c) 2015 Mickey-
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(g) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  g.registerMultiTask('bootstrap_prefix', 'when somebody need to custom bootstrap deeply,this plugin can help them add custom prefix with some key class in less files to avoid possible conflict', function() {

    require('colors');
    var done = this.async();

    var options = this.options({
      // 关键：Gruntfile中可配置的参数
      // .code .pre .typeahead在bootstrap3中删除。新增很多
      keyClass: ['alert', 'badge', 'breadcrumb', 'btn', 'btn-group', 'btn-toolbar', 'dropdown', 'dropdown-menu', 'dropup', 'icon', 'carousel', 'close', 'form', 'row-fluid', 'tag', 'label', 'container', 'container-fluid', 'row', 'modal', 'modal-backdrop', 'navbar', 'nav', 'pagination', 'progress', 'steps', 'table', 'tooltip', 'lead', 'page-header', 'well', 'input-groupa', 'list-group', 'jumbotron', 'media', 'panel', 'thumbnail']
    });

    this.files.forEach(function(f) {
      var buffer = g.file.read(f)
        , classReg = new RegExp('\\.(' + options.keyClass.join('|') + ')(?![-\\w])', 'g')
      buffer = buffer.replace(classReg, '.sui-$1');
      console.log(buffer);
    })

  });

};
