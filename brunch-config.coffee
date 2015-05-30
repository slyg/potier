exports.config =

  conventions:
    # avoid server-side and tests scripts to be compiled
    # to 'public/' folder
    ignored: [
      /^app\/(controllers|services|views)/
      /__tests__\//
    ]

  modules:
    # remove app/scripts from modules refs
    nameCleaner: (path) -> path.replace /^app\/scripts\//, ''

  files:

    javascripts:
      joinTo:
        'javascripts/main.js': /^app/
        'javascripts/vendor.js': /^bower_components/

    stylesheets:
      joinTo: 'stylesheets/main.css'

  server:
    command: 'npm run dev-start'
