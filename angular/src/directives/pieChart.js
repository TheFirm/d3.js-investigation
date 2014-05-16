APP.directive('pieChart', function () {
    return {
        restrict: 'EAC',
        scope: {
            data: '='
        },

        link: function ($scope, $element, $attributes) {
            console.log('pieChart directive: link function inoked');
            if (!$scope.data) {
                console.log('pieChart directive: link function aborted. incorrect arguments ');
                return;
            }

            var _width = $attributes.width || 200,
                _height = $attributes.height || 200,
                minDimension = d3.min([_width, _height]),
                _margin = $attributes.margin || 10,
                maxRadius = Math.round(minDimension / 2 - _margin),
                innerRadius = $attributes.inner * maxRadius / 100 || 0,
                outerRadius = $attributes.outer * maxRadius / 100 || maxRadius,
                changeDuration = $attributes.duration || 0,
                fontSize = $attributes.fontSize || null,
                fontColor = $attributes.fontColor || 'black';

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

                    var newGroups = sectors.enter()
                        .append('g')
                        .attr({
                            transform: 'translate(' + _width / 2 + ', ' + _height / 2 + ')',
                        });

                    newGroups.append('path')
                        .attr({
                            fill: function (d, i) {
                                return colorScale(i);
                            }
                        });

                    newGroups.append("text")
                        .attr("transform", function (d) {
                            return "translate(" + arc.centroid(d) + ")";
                        })
                        .attr("text-anchor", "middle")
                        .style('fill', fontColor)
                        .text(function (d) {
                            return d.value;
                        });


                    sectors.select('path')
                        .transition()
                        .duration(changeDuration)
                        .attr({
                            d: arc
                        });

                    sectors.select('text')
                        .transition()
                        .duration(changeDuration)
                        .attr("transform", function (d) {
                            return "translate(" + arc.centroid(d) + ")";
                        });
                };

            if(fontSize) {
                svg.style({
                    'font-size': fontSize
                })
            };

            $scope.$watchCollection('data', function (d) {
                update(d);
            });
        }
    }
});