APP.directive('huRevenue', function () {
    return {
        restrict: 'EAC',
        scope: {
            profit: '=',
            revenue: '='
        },
        template: '<svg></svg>',
        replace: true,

        link: function ($scope, $element, $attributes) {

            if (!$scope.profit && !$scope.revenue) {
                return;
            }

            var width = 400,
                height = 400,
                svg = d3.select($element[0])
                    .attr({
                        width: width,
                        height: height
                    }),
                revenueCircle = svg.append('circle')
                    .attr({
                        cx: width / 2,
                        cy: height / 2,
                        r: 100,
                        fill: 'red'
                    })
                    .style({
                        opacity: 0.5
                    })
                    .transition()
                    .duration(5000)
                    .attr({
                        r: 200
                    }),

                profitCircle = svg.append('circle')
                    .attr({
                        cx: width / 2,
                        cy: height / 2,
                        r: 80,
                        fill: 'red'
                    })
                    .style({
                        opacity: 0.5
                    })
                    .transition()
                    .duration(5000)
                    .attr({
                        r: 120
                    }),

                logo = svg.append('image')
                    .attr({
                        'xlink:href': '/images/profrevlogo.png',
                        x: width / 2 - 40,
                        y: height / 2 - 40,
                        width: '80px',
                        height: '80px'
                    }),

                profitTextBox = svg.append('rect')
                    .attr({
                        x: width / 2 - 70,
                        y: height / 2 + 50,
                        width: 140,
                        height: 25,
                        fill: 'gray'
                    }),

                revenueTextBox = svg.append('rect')
                    .attr({
                        x: width / 2 - 70,
                        y: height / 2 + 77,
                        width: 140,
                        height: 25,
                        fill: 'ivory'
                    }),

                profitText = svg.append('text')
                    .attr({
                        x: width / 2,
                        y: height / 2 + 68,
                        fill: 'white'
                    })
                    .style({
                        'text-anchor': 'middle',
                    })
                    .text('Profit: 100500$'),

                revenueText = svg.append('text')
                    .attr({
                        x: width / 2,
                        y: height / 2 + 95,
                        fill: 'black'
                    })
                    .style({
                        'text-anchor': 'middle',
                    })
                    .text('Revenue: 100500$')
        }
    }
});