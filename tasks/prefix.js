/*
 * prefix-cssclass
 * https://github.com/Mickey-/prefix-cssclass
 *
 * Copyright (c) 2015 Mickey-
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(g) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  g.registerMultiTask('prefix', 'when somebody need to custom bootstrap deeply,this plugin can help them add custom prefix with some key class in less files to avoid possible conflict', function() {

    require('colors');
    var result = true
      ,opt = this.options({
        prefix: 'sui-'
      })
      ,gruntIns = g.log.write(opt.prefix.cyan + '前缀分析注入开始...\n')
      // 关键：Gruntfile中可配置的参数
      // .code .pre .typeahead在bootstrap3中删除。新增很多
      , defaultKeyClass = ['alert', 'badge', 'breadcrumb', 'btn', 'btn-group', 'btn-toolbar', 'dropdown', 'dropdown-menu', 'dropup', 'icon', 'carousel', 'close', 'form', 'row-fluid', 'tag', 'label', 'container', 'container-fluid', 'row', 'modal', 'modal-backdrop', 'navbar', 'nav', 'pagination', 'progress', 'steps', 'table', 'tooltip', 'lead', 'page-header', 'well', 'input-groupa', 'list-group', 'jumbotron', 'media', 'panel', 'thumbnail']
      , customKeyClass = opt.keyClass
      , keyClass = (g.util.kindOf(customKeyClass) == 'array' && customKeyClass.length) ? customKeyClass : defaultKeyClass
      //查询css文件流中待替换字符的正则
      , cssRE = new RegExp('\\.(' + keyClass.join('|') + ')(?![-\\w])', 'g')
      //查询html文件流中待替换字符的正则。
      //当前策略无法使用全局匹配,求更好建议
      , htmlRE = new RegExp('(class="(?:[^"]*?\\s))(' + keyClass.join('|') + ')(?=["\\s])')
      , write = g.file.write;
    this.files.forEach(function(f) {
      var buffer = g.file.read(f.src)
        , dest = f.dest;
      //判断处理的是css文件还是HTML文件
      if (/\.css$/.test(dest)) {
        //先判断buffer流里是否命中待替换的字符串，避免不必要的文件写入
        if (!cssRE.test(buffer)) return;
        // 添加前缀
        buffer = buffer.replace(cssRE, '.' + opt.prefix + '$1');
        writeFile(dest, buffer);
        return;
      } else if (/\.html?$/.test(dest)) {
        //也需要对可能出现的说明文案里的class处理,规则和处理css文件相同
        buffer = buffer.replace(cssRE, '.' + opt.prefix + '$1');

        /* ------------- 处理html文件 ------------- */
        //为提高效率先将class="xx 替换为class=" xx
        buffer = buffer.replace(/class="/g, 'class=" ');

        //极少数html不需处理
        if (!htmlRE.test(buffer)) return;
        //先对buffer在内存里遍历处理完毕，再一次性输出到IO。TODO 求更好方法
        while(htmlRE.test(buffer)) {
          //替换匹配到的 __一处__
          buffer = buffer.replace(htmlRE, '$1' + opt.prefix + '$2');
        }
        //复原class格式
        buffer = buffer.replace(/class=" /g, 'class="');
        //重写html文件
        writeFile(f.dest, buffer);
      }
    })
    result ? gruntIns.ok() : gruntIns.error('some files error');

    //添加前缀的IO操作
    function writeFile(dest, buffer) {
      if (write(dest, buffer)) {
        g.log.ok(dest + ':' + opt.prefix.green +  '前缀注入完成！');
      } else {
        writeError(dest + ':' + opt.prefix.red +  '前缀注入失败！');
        result = false;
      }
    }
    function writeError (msg) {
      return g.log.error(msg || '文件写入失败！');
    };
  });

};
