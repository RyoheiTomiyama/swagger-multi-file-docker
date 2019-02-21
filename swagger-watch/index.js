const { Gaze } = require('gaze');
const path = require('path');
const merger = require('swagger-merger');

function resolve_path (dir) {
  return path.join(__dirname, '..', dir);
}

function multi_file() {
  const file_path = resolve_path('./src/index.yml');
  const dest_file_path = resolve_path('./docs/swagger.yml');
  const option = {
    input: file_path,
    output: dest_file_path,
  };
  merger(option).catch(err => {
    console.error(err);
  });
}
function watch() {
  const gaze = new Gaze(resolve_path('./src/**'));
  gaze.on('error', (err) => { throw err; });
  gaze.on('all', (event, file) => {
    console.log(event, file);
    multi_file();
  });
  const restart = () => {
    gaze.close();
    watch();
  }
  gaze.on('added', (watcher) => restart());
  gaze.on('removed', (watcher) => restart());
}
multi_file();
watch();