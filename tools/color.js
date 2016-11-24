import colorConvert from 'color-convert';

let testRE = /(^rgb\(\d{1,3}\,\d{1,3}\,\d{1,3}\)$)|(^hsl\(\d{1,3}\,\d{1,3}%\,\d{1,3}%\)$)|(^#?[0-9a-f]{3}$)|(^#?[0-9a-f]{6}$)/;
let matchRE = /(^rgb)|(^hsl)|(^#?[0-9a-f]{3}$)|(^#?[0-9a-f]{6}$)/;

let color = {
    clear: (color) => {
        color = color.replace(/\s|(%20)/g,'').toLowerCase();
        return color;
    },
    test: (color) => {
        console.log('in test');
        return testRE.test(color);
    },
    convert: (color) => {
        console.log('in convert');
        console.log(color.match(matchRE)[0]);
        let conv_color;
        switch (color.match(matchRE)[0]) {
            case 'rgb':
                let rgb_params = color.replace(/(rgb\()|\)/g,'').split(',').map(p => parseInt(p));
                if(rgb_params.filter(p => (p > -1 && p < 256 )).length == 3){
                    conv_color = colorConvert.rgb.hex(rgb_params).toLowerCase();
                    return ('#'+conv_color);
                }else{
                    return 'Invalid color';
                }
                break;
            case 'hsl':
                let hsl_params = color.replace(/(hsl\()|\)|%/g,'').split(',').map(p => parseInt(p));
                console.log(hsl_params);
                if(hsl_params.filter(p => (p < 0)).length) {
                    console.log('under zero');
                    return 'Invalid color';
                }else if(hsl_params[0] < 360 && hsl_params[1] < 101 && hsl_params[2] < 101){
                    conv_color = colorConvert.hsl.hex(hsl_params).toLowerCase();
                    return '#'+conv_color;
                }else{
                    console.log('bad params');
                    return 'Invalid color';
                }
                break;
            default:
                color = color.replace('#','');
                conv_color = (color.length == 3)?color[0]+color[0]+color[1]+color[1]+color[2]+color[2]:color;
                return ('#'+conv_color);
        }
    }
};

export default color;

// re_rgb = /^rgb\(\d{1,3}\,\d{1,3}\,\d{1,3}\)$/
// re_hsl = /^hsl\(\d{1,3}\,\d{1,3}%\,\d{1,3}%\)$/
// re_hex = /(^#?[0-9a-f]{3}$)|(^#?[0-9a-f]{6}$)/
