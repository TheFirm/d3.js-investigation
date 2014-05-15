APP.directive('pieChart', function () {
    return {
        restrict: 'EA',
        scope: {
            data: '='
        },

        link: function ($scope, $element, $attributes) {
            console.log('pieChart directive: link function inoked');
            if (!$scope.data) {
                console.log('pieChart directive: link function aborted. incorrect arguments ');
                return;
            }

            var _width = $attributes.width || 500,
                _height = $attributes.height || 400,
                minDimension = d3.min([_width, _height]),
                _margin = $attributes.margin || 10,
                innerRadius = $attributes.inner || 0,
                outerRadius = $attributes.outer || minDimension / 2 - _margin,
                changeDuration = $attributes.duration || 0,

                svg = d3.select($element[0])
                    .append('svg')
                    .style({
                        width: _width,
                        height: _height
                    }),

                rScale = d3.scale.linear()
                    .domain([
                        d3.min($scope.data), // підлаштовуємо domain під фактично заданий в ngModel масив
                        d3.max($scope.data)
                    ])
                    .range([
                        _margin ,
                        minDimension - _margin // радіус має бути менший за висоту і ширину області
                    ]),

                colorScale = d3.scale.category20(),

                arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius),

                pieLayout = d3.layout.pie(),

                update = function (_data) {
                    console.log('pieChart directive: updating chart');
                    var sectors = svg.selectAll('g')
                        .data(pieLayout(_data));

                    sectors.enter()
                        .append('g')
                        .attr({
                            transform: 'translate(' + _width / 2 + ', ' + _height / 2 + ')',
                            fill: function (d, i) {
                                return colorScale(i);
                            }
                        })
                        .append('path');

                    sectors.select('path')
                        .transition()
                        .duration(changeDuration)
                        .attr({
                            d: arc,
                            fill: function (d, i) {
                                return colorScale(i);
                            }
                        });
                };

            $scope.$watchCollection('data', function(d) {
                update(d);
            });
        }
    }
});