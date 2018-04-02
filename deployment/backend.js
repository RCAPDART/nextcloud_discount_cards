/* eslint-disable no-console,no-undef */
var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var user = 'ftpuser';
var password = '';
var server = '5.2.75.196';
var port = 21;
var localRoot = __dirname + '/';
var remoteRoot = '';

var config = {
    username: user,
    password: password, // optional, prompted if none given
    host: server,
    port: port,
    localRoot: localRoot,
    remoteRoot: remoteRoot,
    include: ['build', 'templates'],
    exclude: ['.git', '.idea', 'tmp/*', '.gitignore', 'node_modules', 'js',
        'webpack', 'package.json', 'package-lock.json', 'README.md', '.eslintrc',
        'deploy.js', 'build.php', 'public', 'build', 'bwipjs-fonts'
    ]
}

ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('FTP deployment is finished.');
});

ftpDeploy.on('uploading', function(data) {
    data.totalFileCount;       // total file count being transferred
    data.transferredFileCount; // number of files transferred
    data.percentComplete;      // percent as a number 1 - 100
    data.filename;             // partial path with filename being uploaded
});
ftpDeploy.on('uploaded', function(data) {
    console.log('Uploaded "' + data.filename +
        '". Progress: ' + data.transferredFileCount + '/' + data.totalFileCount);
});
ftpDeploy.on('upload-error', function (data) {
    console.log(data.err); // data will also include filename, relativePath, and other goodies
});