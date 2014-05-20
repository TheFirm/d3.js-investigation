//TODO: implement parent auto fit
APP.directive('pieChart', function () {
    return {
        restrict: 'EAC',
        scope: {
            data: '=',
            lF: '&labelFactory'
        },

        link: function ($scope, $element, $attributes) {
            console.log('pieChart directive: link function invoked');
            if (!$scope.data) {
                console.log('pieChart directive: link function aborted. incorrect arguments ');
                return;
            }

            var _width = $attributes.width || 200,
                _height = $attributes.height || 200,
                minDimension = d3.min([_width, _height]),
                _margin = $attributes.margin || 10,
                maxRadius = Math.round(minDimension / 2 - _margin),
                innerRadius = $attributes.innerRadius * maxRadius / 100 || 0,
                outerRadius = $attributes.outerRadius * maxRadius / 100 || maxRadius,
                changeDuration = $attributes.duration || 0,
                hideLabels = !!($attributes.labelHide),
                fontSize = $attributes.fontSize || null,
                fontColor = $attributes.fontColor || 'black',
                strokeSize = $attributes.strokeSize || '0',
                strokeColor = $attributes.strokeColor || 'black',
                labelFactory = ($attributes.labelFactory && $scope.lF) || null,
                denySorting = $attributes.denySorting || false,

                svg = d3.select($element[0])
                    .append('svg')
                    .attr({
                        width: _width,
                        height: _height
                    }),

                colorScale = d3.scale.category20(),

                arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius),

                pieLayout = d3.layout.pie(),

                update = function (_data) {
                    console.log('pieChart directive: updating chart');
                    var sectors = svg.selectAll('g')
                            .data(pieLayout(_data)), //binding data to existing sectors

                        newSectors = sectors.enter() // creating new sectors
                            .append('g')
                            .attr({
                                transform: 'translate(' + _width / 2 + ', ' + _height / 2 + ')'
                            });

                    sectors.exit() // deleting empty sectors
                        .remove();

                    newSectors.append('path')
                        .attr({
                            d: arc,
                            fill: function (d, i) {
                                return colorScale(i);
                            },
                            stroke: strokeColor,
                            'stroke-width': strokeSize
                        });

                    if (!hideLabels) {
                        newSectors.append("text")
                            .attr({
                                transform: function (d) {
                                    return "translate(" + arc.centroid(d) + ")";
                                },
                                "text-anchor": "middle"
                            })
                            .style('fill', fontColor)
                            .text(function (d, i) {
                                if (labelFactory && typeof labelFactory === 'function') {
                                    return labelFactory({value: d.value, index: i});
                                } else {
                                    return d.value;
                                }
                            });
                    }

                    sectors.select('path')
                        .transition()
                        .duration(changeDuration)
                        .attr({
                            d: arc
                        });

                    if (!hideLabels) {
                        sectors.select('text')
                            .transition()
                            .duration(changeDuration)
                            .attr("transform", function (d) {
                                return "translate(" + arc.centroid(d) + ")";
                            })
                            .text(function (d, i) {
                                if (labelFactory && typeof labelFactory === 'function') {
                                    return labelFactory({value: d.value, index: i});
                                } else {
                                    return d.value;
                                }
                            });
                    }

                };

            if (fontSize) {
                svg.style({
                    'font-size': fontSize
                })
            }

            if (denySorting) {
                pieLayout.sort(null);
            }

            $scope.$watchCollection('data', function (d) {
                update(d);
            });

        }
    }
});