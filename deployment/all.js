/* eslint-disable no-console,no-undef */
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const user = 'ftpuser';
const password = '';
const server = '5.2.75.196';
const port = 21;
const localRoot = './';
const remoteRoot = '';

const config = {
  username: user,
  password: password, // optional, prompted if none given
  host: server,
  port: port,
  localRoot: localRoot,
  remoteRoot: remoteRoot,
  include: ['build', 'templates'],
  exclude: ['.git', '.idea', 'tmp/*', '.gitignore', 'node_modules', 'js',
    'webpack', 'package.json', 'package-lock.json', 'README.md', '.eslintrc',
    'deploy.js', 'build.php', 'deployment'
  ]
};

ftpDeploy.deploy(config, function (err) {
  if (err) console.log(err);
  else console.log('FTP deployment is finished.');
});

ftpDeploy.on('uploading', function (data) {
  data.totalFileCount; // total file count being transferred
  data.transferredFileCount; // number of files transferred
  data.percentComplete; // percent as a number 1 - 100
  data.filename; // partial path with filename being uploaded
});

ftpDeploy.on('uploaded', function (data) {
  console.log('Uploaded "' + data.filename +
    '". Progress: ' + data.transferredFileCount + '/' + data.totalFileCount);
});

ftpDeploy.on('upload-error', function (data) {
  console.log(data.err); // data will also include filename, relativePath, and other goodies
});
