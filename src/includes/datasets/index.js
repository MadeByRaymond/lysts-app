export const categories = [
    'birthday',
    'anniversary',
    'wedding',
    'christmas',
    'hanukkah',
    'new_year',
    'valentines',
    'graduation',
    'job_promotion',
    'baby_shower',
    'house_warming',
    'holidays',
    'mother0s_day',
    'father0s_day',
    'just_because',
    'other'
    
];

export const wishlistReportReasons = [
    'It\'s Spam',
    'It\'s Inappropriate',
    'Other'
];

export const issueReportReasons = [
    'An Issue / Bug',
    'A Feature Request',
    'Other'
];

// export const avatarCustomizer = { 
//     skinTone : ['#FFE5BA','#F9C9B6','#ECA08A','#AC6651','#77311D'],
//     hairColor : ['#000000','#263238','#535461','#A57939','#C1453E','#EA5A47','#FAD08C','#F8E99F','#8DC6CC','#D2EFF3','#FC909F','#FFFDF3'],
//     shirtColor : ['#000000','#6BD9E9','#47E6B1','#FFA4D2','#224762','#F8E99F','#B1CC33','#FFFFFF'],
//     shirtCollarColor : ['#000000','#D2EFF3','#AFFFE4','#FFDAED','#D1ECFF','#FFF7CF','#F3FFB9','#EBE7F2'],
//     eyeGlass : ['#000000','#F4D150','#224762','#B1CC33','#FAD08C','#FFFDF3'],
//     jewelry : ['#000000','#F4D150','#224762','#B1CC33','#FAD08C','#FFFDF3'],
//     bgColor : ['#FFEDEF','#F9E59D','#E0DDFF','#E9F6EF','#EFEFEF'],
// }

export const avatarCustomizer = { 
    accessory : ['none', 'roundGlasses', 'tinyGlasses', 'shades', 'faceMask', 'hoopEarrings'],
    bgColor : ['blue', 'green', 'red', 'orange', 'yellow', 'turqoise', 'pink', 'purple'],
    bgShape : ['circle', 'square', 'squircle'],
    body : ['chest', 'breasts'],
    clothing : ['naked', 'shirt', 'dressShirt', 'vneck', 'tankTop', 'dress', 'denimJacket', 'hoodie', 'chequeredShirt', 'chequeredShirtDark'],
    clothingColor : ['white', 'blue', 'black', 'green', 'red'],
    eyebrows : ['raised', 'leftLowered', 'serious', 'angry', 'concerned'],
    eyes : ['normal', 'leftTwitch', 'happy', 'content', 'squint', 'simple', 'dizzy', 'wink', 'hearts', 'crazy', 'cute', 'dollars', 'stars', 'cyborg', 'simplePatch', 'piratePatch'],
    facialHair : ['none', 'stubble', 'mediumBeard', 'goatee'],
    graphic : ['none', 'redwood', 'gatsby', 'vue', 'react', 'graphQL', 'donut', 'rainbow'],
    hair : ['none', 'long', 'bun', 'short', 'pixie', 'balding', 'buzz', 'afro', 'bob', 'mohawk'],
    hairColor : ['blonde', 'orange', 'black', 'white', 'brown', 'blue', 'pink'],
    hat : ['none', 'beanie', 'turban', 'party', 'hijab'],
    hatColor : ['white', 'blue', 'black', 'green', 'red'],
    lashes : [true, false],
    lipColor : ['red', 'purple', 'pink', 'turqoise', 'green'],
    mouth : ['grin', 'sad', 'openSmile', 'lips', 'open', 'serious', 'tongue', 'piercedTongue', 'vomitingRainbow'],
    showBackground : [true, false],
    skinTone : ['light', 'yellow', 'brown', 'dark', 'red', 'black'],
}

export const avatarCustomizerColors = {
      skinTone: {
        light: {
          base: '#fdd2b2',
          shadow: '#f3ab98'
        },
        yellow: {
          base: '#FBE8B3',
          shadow: '#EDD494'
        },
        brown: {
          base: '#D8985D',
          shadow: '#C6854E'
        },
        dark: {
          base: '#A56941',
          shadow: '#8D5638'
        },
        red: {
          base: '#CC734C',
          shadow: '#B56241'
        },
        black: {
          base: '#754437',
          shadow: '#6B3D34'
        }
      },
      hairColor: {
        blonde: {
          base: '#FEDC58',
          shadow: '#EDBF2E'
        },
        orange: {
          base: '#D96E27',
          shadow: '#C65C22'
        },
        black: {
          base: '#592d3d',
          shadow: '#592d3d'
        },
        white: {
          base: '#ffffff',
          shadow: '#E2E2E2'
        },
        brown: {
          base: '#A56941',
          shadow: '#8D5638'
        },
        blue: {
          base: '#85c5e5',
          shadow: '#67B7D6'
        },
        pink: {
          base: '#D69AC7',
          shadow: '#C683B4'
        }
      },
      lipColor: {
        red: {
          base: '#DD3E3E',
          shadow: '#C43333'
        },
        purple: {
          base: '#B256A1',
          shadow: '#9C4490'
        },
        pink: {
          base: '#D69AC7',
          shadow: '#C683B4'
        },
        turqoise: {
          base: '#5CCBF1',
          shadow: '#49B5CD'
        },
        green: {
          base: '#4AB749',
          shadow: '#3CA047'
        }
      },
      clothingColor: {
        white: {
          base: '#FFFFFF',
          shadow: '#E2E2E2'
        },
        blue: {
          base: '#85c5e5',
          shadow: '#67B7D6'
        },
        black: {
          base: '#633749',
          shadow: '#5E3244'
        },
        green: {
          base: '#89D86F',
          shadow: '#7DC462'
        },
        red: {
          base: '#D67070',
          shadow: '#C46565'
        }
      },
      hatColor: {
        white: {
          base: '#FFFFFF',
          shadow: '#E2E2E2'
        },
        blue: {
          base: '#85c5e5',
          shadow: '#67B7D6'
        },
        black: {
          base: '#633749',
          shadow: '#5E3244'
        },
        green: {
          base: '#89D86F',
          shadow: '#7DC462'
        },
        red: {
          base: '#D67070',
          shadow: '#C46565'
        }
      },
      bgColor: {
        blue: {
            base: '#85c5e5',
            shadow: '#85c5e5'
        },
        green: {
            base: '#89D86F',
            shadow: '#89D86F'
        },
        red: {
            base: '#ED9191',
            shadow: '#ED9191'
        },
        orange: {
            base: '#F6AD55',
            shadow: '#F6AD55'
        },
        yellow: {
            base: '#F6E05E',
            shadow: '#F6E05E'
        },
        turqoise: {
            base: '#4FD1C5',
            shadow: '#4FD1C5'
        },
        pink: {
            base: '#F687B3',
            shadow: '#F687B3'
        },
        purple: {
            base: '#B794F4',
            shadow: '#B794F4'
        }
      },
      outline: '#592d3d',
      white: '#ffffff',
      tongue: '#f28195'
}

export const sessionTimeoutLimits = [
    // These are all calculated in Hours 
    {
        label: 'Infinite',
        value: 'infinite',
        key: 'infinite',
        comment: 'Lasts Forever until user signs out'
    },
    {
        label: 'Few Hours',
        value: '12',
        key: '12',
        comment: 'Lasts 12 hours'
    },
    {
        label: 'Few Days',
        value: '126',
        key: '126',
        comment: 'Lasts 5.25 days'
    },
    {
        label: 'Few Weeks',
        value: '504',
        key: '504',
        comment: 'Lasts 3 weeks'
    },
    {
        label: 'Few Months',
        value: '2190',
        key: '2190',
        comment: 'Lasts 3 months'
    },
]