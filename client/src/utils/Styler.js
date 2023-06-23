// scheme options:
// Default, Blues, Forest, Summer, Beach, Dark Neutral, Greens, Autumn
class Styler {
    constructor(schemeName) {
        this.colorScheme = schemeName;
        this.colors = getSchemeColors(schemeName);
    }

    getSchemeCSSRule() {
        let colors = this.colors;
        let variableString = `:root { --darkest: ${colors.darkest}; --lightText: ${colors.lightText}; --buttonBack: ${colors.buttonBack}; --buttonText: ${colors.buttonText}; --addButton: ${colors.addButton}}`;
        return variableString;
    }

    setColorScheme(newScheme) {
        this.colorScheme = newScheme;
        this.colors = getSchemeColors(newScheme);
    }

    getColorScheme() {
        return this.colorScheme;
    }
    
}

function getSchemeColors(schemeName) {
    let colors = {
        darkest: '',
        lightText: '',
        buttonBack: '',
        buttonText: '',
        addButton: ''
    }

    if (schemeName === 'Blues') {
        colors.darkest = '#133C55';
        colors.lightText = '#91E5F6';
        colors.buttonBack = '#59A5D8';
        colors.buttonText = '#cff7ff';
        colors.addButton = '#386FA4';
    }

    else if (schemeName === 'Forest') {
        colors.darkest = '#373D20';
        colors.lightText = '#EFF1ED';
        colors.buttonBack = '#766153';
        colors.buttonText = '#EFF1ED';
        colors.addButton = '#717744';
    } 

    else if (schemeName === 'Beach') {
        colors.darkest = '#023047';
        colors.lightText = '#FFB703';
        colors.buttonBack = '#219EBC';
        colors.buttonText = '#FFB703';
        colors.addButton = '#8ECAE6';
    }


    else if (schemeName === 'Dark Neutral') {
        colors.darkest = '#14110f'; 
        colors.lightText = '#d9c5b2';
        colors.buttonBack = '#7e7f83';
        colors.buttonText = '#f3f3f4';
        colors.addButton = '#34312d';
    }

    else if (schemeName === 'Greens') {
        colors.darkest = '#132a13';
        colors.lightText = '#ecf39e';
        colors.buttonBack = '#4f772d';
        colors.buttonText = '#ecf39e';
        colors.addButton = '#31572c';
    }

    else if (schemeName === 'Autumn') {
        colors.darkest = '#04151f';
        colors.lightText = '#c44900';
        colors.buttonBack = '#183a37';
        colors.buttonText = '#efd6ac';
        colors.addButton = '#432534';
    }

    else if (schemeName === 'Summer') {
        colors.darkest = '#22A699';
        colors.lightText = '#F2BE22';
        colors.buttonBack = '#F2BE22';
        colors.buttonText = '#F24C3D';
        colors.addButton = '#22A699';
    }

    // else if (schemeName === '') {
    //     colors.darkest = '#';
    //     colors.lightText = '#';
    //     colors.buttonBack = '#';
    //     colors.buttonText = '#';
    //     colors.addButton = '#';
    // }

    else {
        colors.darkest = 'blue';
        colors.lightText = 'white';
        colors.buttonBack = 'blue';
        colors.buttonText = 'white';
        colors.addButton = 'blue';
    }

    return colors;
}


let styleObj = new Styler('');

export default styleObj;
