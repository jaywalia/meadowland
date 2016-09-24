console.log('welcome to meadowland')



var fortunes = [
    "Apples are sweet",
    "Oranges are sour",
    "Strawberries are yummy",
    "Blackberries are yum yum"
]

var express = require('express')

var app = express();
var handlebars = require('express-handlebars')
                    .create({ defaultLayout: 'main' })

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.set('port', process.env.PORT || 8818)

app.get('/', function(req, res){
    //res.type('text/plain')
    //res.send('Meadowland travels')
    res.render('home')
})

app.get('/about', function(req, res){
    //res.type('text/plain')
    //res.send('About Meadowland')
    var rFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', {fortune:rFortune})
})

app.use(function(req, res){
    //res.type('text/plain')
    res.status(404)
    //res.send('404 - plain unlucky')
    res.render('404')
})

app.use(function(err, req, res, next){
    console.error(err.stack)
    //res.type('text/plain')
    res.status(500)
    //res.send('500 - server error')
    res.render('500')
})



app.listen(app.get('port'), function(){
    console.log('express started on http://localhost:' + 
        app.get('port') + ';press Ctrl+C to terminate')
})

