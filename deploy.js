var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    username: "ftpuser",
    password: "tP3U^hZr11s*", // optional, prompted if none given
    host: "5.2.75.196",
    port: 21,
    localRoot: __dirname + "/build",
    remoteRoot: "/build",
    include: ['build/version.txt'],
    exclude: ['.git', '.idea', 'tmp/*', 'build/*']
}

ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('Deploy finished');
});

ftpDeploy.on('uploading', function(data) {
    data.totalFileCount;       // total file count being transferred
    data.transferredFileCount; // number of files transferred
    data.percentComplete;      // percent as a number 1 - 100
    data.filename;             // partial path with filename being uploaded
});
ftpDeploy.on('uploaded', function(data) {
    console.log(data);         // same data as uploading event
});
ftpDeploy.on('upload-error', function (data) {
    console.log(data.err); // data will also include filename, relativePath, and other goodies
});