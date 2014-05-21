APP.directive('huRevenue', function () {
    return {
        restrict: 'EAC',

        link: function ($scope, $element, $attributes) {

            var size = $attributes.size || 400,
                money = 1200,
                circleColor = $attributes.fill || 'black',
                logoUrl = $attributes.logo,
                svg = d3.select($element[0])
                    .append('svg')
                    .attr({
                        width: size >= 185 ? size : 185, // 185x185 -  min bounding box for labels
                        height: size >= 185 ? size : 185
                    }),
                revenueCircle = svg.append('circle')
                    .attr({
                        cx: size / 2,
                        cy: size / 2,
                        r: 20,
                        fill: circleColor
                    })
                    .style({
                        opacity: 0.5
                    })
                    .transition()
                    .duration(8000)
                    .attr({
                        r: size / 2
                    }),

                profitCircle = svg.append('circle')
                    .attr({
                        cx: size / 2,
                        cy: size / 2,
                        r: 10,
                        fill: circleColor
                    })
                    .style({
                        opacity: 0.5
                    })
                    .transition()
                    .duration(12000)
                    .attr({
                        r: size / 4
                    }),

                logo = svg.append('image')
                    .attr({
                        'xlink:href': logoUrl,
                        x: size / 2 - 30,
                        y: size / 2 - 60,
                        width: '60px',
                        height: '60px'
                    }),

                profitTextBox = svg.append('rect')
                    .attr({
                        x: size / 2 - 70,
                        y: size / 2 + 10,
                        width: 140,
                        height: 25,
                        fill: 'gray'
                    }),

                revenueTextBox = svg.append('rect')
                    .attr({
                        x: size / 2 - 70,
                        y: size / 2 + 37,
                        width: 140,
                        height: 25,
                        fill: 'ivory'
                    }),

                profitText = svg.append('text')
                    .attr({
                        x: size / 2,
                        y: size / 2 + 28,
                        fill: 'white'
                    })
                    .style({
                        'text-anchor': 'middle'
                    })
                    .text('Profit: ' + money + '$'),

                revenueText = svg.append('text')
                    .attr({
                        x: size / 2,
                        y: size / 2 + 55,
                        fill: 'black'
                    })
                    .style({
                        'text-anchor': 'middle'
                    })
                    .text('Revenue: ' + money + '$'),

                timer;

            timer = setInterval(function () {
                money += 17;
                revenueText.text('Revenue: ' + ( money * 17 ) + '$');
                profitText.text('Profit: ' + money + '$');
                if (money > 10000) {
                    clearInterval(timer);
                }

            }, 30);

        }
    }
});