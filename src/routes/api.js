var data = [];
var express = require('express');
var router = express.Router();
var pg = require('pg');
var id, user_name, user_password;
var client = new pg.Client({
    user: "ipznqcmmcmdvtq",
    password: "au3qPIwR9qT3XPwAYCJuszzCSw",
    database: "dgek9pf0b67pu",
    port: 5432,
    host: "ec2-54-163-228-188.compute-1.amazonaws.com",
    ssl: true
});
client.connect();
//populating data from database
var query = client.query("SELECT * FROM users");
query.on('row', function(row) {
    data.push({
        userID: row.user_id,
        userEmail: row.user_email,
        userPassword: row.user_password
    })
});

query.on('end', function() {
    client.end();
});
// GET

exports.posts = function (req, res) {
    var posts = [];
    data.posts.forEach(function (post, i) {
        posts.push({
            id: i,
            title: post.title,
            text: post.text.substr(0, 50) + '...'
        });
    });
    res.json({
        posts: posts
    });
};

exports.post = function (req, res) {
    var id = req.params.id;
    if (id >= 0 && id < data.posts.length) {
        res.json({
            post: data.posts[id]
        });
    } else {
        res.json(false);
    }
};

// POST
exports.addPost = function (req, res) {
    data.posts.push(req.body);
    res.json(req.body);
};

// PUT
exports.editPost = function (req, res) {
    var id = req.params.id;

    if (id >= 0 && id < data.posts.length) {
        data.posts[id] = req.body;
        res.json(true);
    } else {
        res.json(false);
    }
};

// DELETE
exports.deletePost = function (req, res) {
    var id = req.params.id;

    if (id >= 0 && id < data.posts.length) {
        data.posts.splice(id, 1);
        res.json(true);
    } else {
        res.json(false);
    }
};