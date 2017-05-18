var app = angular.module("quick-peek", ['ngMaterial'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.definePalette('mypalette', {
            '50': 'e8f0f8',
            '100': 'c5daee',
            '200': '9ec2e3',
            '300': '77aad7',
            '400': '5a97cf',
            '500': '3d85c6',
            '600': '377dc0',
            '700': '2f72b9',
            '800': '2768b1',
            '900': '1a55a4',
            'A100': 'dae9ff',
            'A200': 'a7caff',
            'A400': '74abff',
            'A700': '5b9cff',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': [
                '500',
                '600',
                '700',
                '800',
                '900'
            ]
        });

        $mdThemingProvider.theme('default')
        .primaryPalette('mypalette')
             //.primaryPalette('teal')
             .accentPalette('lime');
            



    });

//https://material.io/color/#!/?view.left=0&view.right=0&primary.color=212121&secondary.color=4DD0E1