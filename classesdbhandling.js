//users_classes_attended,semesters관련 함수들
const util = require('util');
var sql = require('mysql');
var db = require('./database');
var classcoderecv = function(body) {
    return new Promise(function(resolve, reject) {
        let classstring = '';
        for (var i = 0; i < body.classcodes.length; i++) {
            classcodestring += body.classcodes[i]
        }
        resolve(classcodestring);
    })
}

exports.storestatus = function(req, res) {
    return new Promise(function(resolve, reject) {
        classcoderecv(req.body).then(
            function(result) {
                db.query("USE gracurri_user;");
                db.query('UPDATE users_classes_attended set classcodes=? WHERE EMAIL=?', [result, req.body.email])
            }
        )
        resolve(req.body.classcodes);
    })

}
exports.getname = function(req, res) {
    db.query('USE subjects');
    db.query('SELECT name from subject_1 WHERE id=? ; SELECT name from subject WHERE id=?', [req.code, req.code],
        function(error, result) {
            if (error) {
                res.send({
                    "code": 400,
                    "result": "error"
                });
            } else {
                console.log(result);
                res.send(result);
            }
        })
}

exports.gettoattend = function(req, res, email, semester) {
    let semreturn = '';
    if (semester === 'one') {
        semreturn = '1-1';
    } else if (semester === 'two') {
        semreturn = '1-2';
    } else if (semester === 'three') {
        semreturn = '2-1';
    } else if (semester === 'four') {
        semreturn = '2-2';
    } else if (semester === 'five') {
        semreturn = '3-1';
    } else if (semester === 'six') {
        semreturn = '3-2';
    } else if (semester === 'seven') {
        semreturn = '3-1';
    } else if (semester === 'eight') {
        semreturn = '3-2';
    }
    db.query('USE gracurri_user;');
    db.query('SELECT * from semesters where EMAIL=?', email, function(error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "result": "error"
            })
        } else {
            if (results.length > 0) {
                if (semester === "one") {
                    res.send({
                        "code": 200,
                        "result": results[0].one,
                        "semester": semreturn
                    })
                } else if (semester === 'two') {
                    res.send({
                        "code": 200,
                        "result": results[0].two,
                        "semester": semreturn
                    })
                } else if (semester === 'three') {
                    res.send({
                        "code": 200,
                        "result": results[0].three,
                        "semester": semreturn
                    })
                } else if (semester === 'four') {
                    res.send({
                        "code": 200,
                        "result": results[0].four,
                        "semester": semreturn
                    })
                } else if (semester === 'five') {
                    res.send({
                        "code": 200,
                        "result": results[0].five,
                        "semester": semreturn
                    })
                } else if (semester === 'six') {
                    res.send({
                        "code": 200,
                        "result": results[0].six,
                        "semester": semreturn
                    })
                } else if (semester === 'seven') {
                    res.send({
                        "code": 200,
                        "result": results[0].seven,
                        "semester": semreturn
                    })
                } else {
                    res.send({
                        "code": 200,
                        "result": results[0].eight,
                        "semester": semreturn
                    })
                }
            }
        }
    })
}

exports.tableshowsem = function(query, res) {
    return new Promise(function(resolve, reject) {
        db.query('use gracurri_user;');
        db.query('SELECT semester from users WHERE EMAIL=?', [query.email],
            function(error, results, fields) {
                currsem = results[0].semester;
                resolve(currsem, query.email);
            });
    })

}
exports.getclasses = function(query, email) {
    return new Promise(function(resolve, reject) {
        db.query('use gracurri_user;');
        db.query('SELECT ? from semesters where EMAIL=?', [query.semester, query.email],
            function(error, results, fields) {
                if (error) {
                    res.send({
                        "code": 400,
                        "result": "error!"
                    })
                } else {
                    semeseterset(query.semester, results).then(function(code) {
                        var names = [];
                        var timeandloc = [];
                        for (var i = 0; i < code.length; i += 10) {
                            var temp = code.slice(i, i + 10);
                            db.query('USE subjects;');
                            db.query('SELECT name,classtimeandlocation from subject where id=?', [temp],
                                function(error, result) {
                                    if (result.length > 0) {
                                        names.push(result[0].name);
                                        timeandloc.push(result[0].classtimeandlocation);
                                    } else {
                                        db.query('SELECT name,classtimeandlocation from subject_1 where id=?', [temp],
                                            function(errors, results) {
                                                if (!errors && results.length > 0) {
                                                    names.push(results[0].name);
                                                    timeandloc.push(results[0].classtimeandlocation);
                                                }
                                            })
                                    }
                                });

                        }
                        return (names, timeandloc);
                    }).then(function(names, timeandloc) {
                        res.send({
                            "code": 200,
                            "result": names,
                            "timeandloc": timeandloc
                        })
                    });

                }
            })
    })
}