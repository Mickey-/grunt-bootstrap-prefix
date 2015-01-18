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
    var done = this.async()
      ,opt = this.options({
        prefix: 'sui-'
      })
      // 关键：Gruntfile中可配置的参数
      // .code .pre .typeahead在bootstrap3中删除。新增很多
      , defaultKeyClass = ['alert', 'badge', 'breadcrumb', 'btn', 'btn-group', 'btn-toolbar', 'dropdown', 'dropdown-menu', 'dropup', 'icon', 'carousel', 'close', 'form', 'row-fluid', 'tag', 'label', 'container', 'container-fluid', 'row', 'modal', 'modal-backdrop', 'navbar', 'nav', 'pagination', 'progress', 'steps', 'table', 'tooltip', 'lead', 'page-header', 'well', 'input-groupa', 'list-group', 'jumbotron', 'media', 'panel', 'thumbnail']
      , customKeyClass = opt.keyClass
      , keyClass = (g.util.kindOf(customKeyClass) == 'array' && customKeyClass.length) ? customKeyClass : defaultKeyClass;

    this.files.forEach(function(f) {
      var buffer = g.file.read(f.src)
        , classReg = new RegExp('\\.(' + keyClass.join('|') + ')(?![-\\w])', 'g')
        , write = g.file.write;
      // 添加前缀
      if (write(f.dest, buffer.replace(classReg, '.' + opt.prefix + '$1'))) {
        return g.log.ok(f.src[0] + ':' + opt.prefix +  '前缀注入完成！');
      } else {
        return writeError(f.src[0] + ':' + opt.prefix +  '前缀注入失败！');
      }
    })
    function writeError (msg) {
      return g.log.error(msg || '文件写入失败！');
    };
  });

};
