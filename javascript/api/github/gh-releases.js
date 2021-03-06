jQuery.fn.loadReleases = function(username, repoName) {
    this.html("<span>API rate limit exceeded. (But here's the good news: Authenticated requests get a higher rate limit. <a href='https://developer.github.com/v3/#rate-limiting'>Check out the documentation for more details.</a>)</span><br><span>Normal Users: we are sorry that we cannot connect to githubs servers to get the information. <a href='https://github.com/" + username + "/" + repoName + "/releases'>Click here to see them directly on GitHub's Servers.</a></span>");
     
    var target = this;
    var text = "";
  //https://api.github.com/repos/#username#/#reponame#/releases
    githubAPI("repos/" + username + "/" + repoName + "/releases", function(data) {
        var releases = data.data; // JSON Parsing
      //https://github.com/tumblegamer/TumbleCraft/releases/new
        
        $(releases).each(function() {
            text = text + "<tr><td><a href='" + this.html_url + "'>" + this.name + "</a></td><td>" + this.tag_name + "</td><td><a href='" + this.assets[0].browser_download_url + "'>Download</a>(" + this.assets[0].download_count + ")</td>";
        });
        text = "<a href='https://github.com/" + username + "/" + repoName + "/releases/new'>Add</button></a>" + "<table style='width:100%'><tr><th>Version Name</th><th>Version Number</th> <th> </th></tr>" + text + "</table>";
        target.html(text);
    });
};
