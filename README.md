# prefix-cssclass

> when somebody need to custom bootstrap deeply,this plugin can help them add custom prefix with some key class in less files to avoid possible conflict

## Getting Started
This plugin requires Grunt `~0.4.5`

```shell
npm install prefix-cssclass --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('prefix-cssclass');
```

## The "prefix" task

### Overview
In your project's Gruntfile, add a section named `prefix` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  prefix: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.keyClass
Type: `Array`
Default value: `['alert', 'badge', 'breadcrumb', 'btn', 'btn-group', 'btn-toolbar', 'dropdown', 'dropdown-menu', 'dropup', 'icon', 'carousel', 'close', 'form', 'row-fluid', 'tag', 'label', 'container', 'container-fluid', 'row', 'modal', 'modal-backdrop', 'navbar', 'nav', 'pagination', 'progress', 'steps', 'table', 'tooltip', 'lead', 'page-header', 'well', 'input-groupa', 'list-group', 'jumbotron', 'media', 'panel', 'thumbnail']`

css class array that is used to add specific prefix

#### options.prefix
Type: `String`
Default value: `'sui-'`

A string value that is used to be prefix name.

### Usage Examples

```
    prefix: {
      options: {
        keyClass: []
        ,prefix: 'sui-'
      },
      sui: {
        expand: true,
        cwd: 'less/',
        src: ['./*.less'],
        dest: 'less/',
        ext: '.less'
      }

```

## Contributing

## Release History
