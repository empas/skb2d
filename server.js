import express   from 'express';
import cors      from 'cors';
import colorTool from './tools/color';
const app  = express();
const port = 3000;

let parseColor = (color) => {
    color = colorTool.clear(color);
    if(!colorTool.test(color)) return 'Invalid color';
    return colorTool.convert(color);
};

app.use(cors());
app.use(logger);
app.get('/',(req, res) => {

    let color = req.query.color;
    if(!color) res.send('Invalid color');
    res.send(parseColor(color));

});

const server = app.listen(port);
console.log('Server is listening on port ' + port);

function logger(req, res, next){
    console.log('request');
    console.log(req.query);
    next();
}
