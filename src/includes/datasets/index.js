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

export const avatarCustomizer = { 
    skinTone : ['#FFE5BA','#F9C9B6','#ECA08A','#AC6651','#77311D'],
    hairColor : ['#000000','#263238','#535461','#A57939','#C1453E','#EA5A47','#FAD08C','#F8E99F','#8DC6CC','#D2EFF3','#FC909F','#FFFDF3'],
    shirtColor : ['#000000','#6BD9E9','#47E6B1','#FFA4D2','#224762','#F8E99F','#B1CC33','#FFFFFF'],
    shirtCollarColor : ['#000000','#D2EFF3','#AFFFE4','#FFDAED','#D1ECFF','#FFF7CF','#F3FFB9','#EBE7F2'],
    eyeGlass : ['#000000','#F4D150','#224762','#B1CC33','#FAD08C','#FFFDF3'],
    jewelry : ['#000000','#F4D150','#224762','#B1CC33','#FAD08C','#FFFDF3'],
    bgColor : ['#FFEDEF','#F9E59D','#E0DDFF','#E9F6EF','#EFEFEF'],
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