/*
 Highcharts JS v5.0.0 (2016-09-29)
 Accessibility module

 (c) 2010-2016 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(k){"object"===typeof module&&module.exports?module.exports=k:k(Highcharts)})(function(k){(function(e){function k(a){for(var b=a.childNodes.length;b--;)a.appendChild(a.childNodes[b])}function t(a){var b;a&&a.onclick&&(b=m.createEvent("Events"),b.initEvent("click",!0,!1),a.onclick(b))}var w=e.win,m=w.document,h=e.each,y=e.erase,v=e.addEvent,z=e.removeEvent,A=e.fireEvent,B=e.dateFormat,u=e.merge,p={"default":["series","data point","data points"],line:["line","data point","data points"],spline:["line",
"data point","data points"],area:["line","data point","data points"],areaspline:["line","data point","data points"],pie:["pie","slice","slices"],column:["column series","column","columns"],bar:["bar series","bar","bars"],scatter:["scatter series","data point","data points"],boxplot:["boxplot series","box","boxes"],arearange:["arearange series","data point","data points"],areasplinerange:["areasplinerange series","data point","data points"],bubble:["bubble series","bubble","bubbles"],columnrange:["columnrange series",
"column","columns"],errorbar:["errorbar series","errorbar","errorbars"],funnel:["funnel","data point","data points"],pyramid:["pyramid","data point","data points"],waterfall:["waterfall series","column","columns"],map:["map","area","areas"],mapline:["line","data point","data points"],mappoint:["point series","data point","data points"],mapbubble:["bubble series","bubble","bubbles"]},C={boxplot:" Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile and maximum. ",
arearange:" Arearange charts are line charts displaying a range between a lower and higher value for each point. ",areasplinerange:" These charts are line charts displaying a range between a lower and higher value for each point. ",bubble:" Bubble charts are scatter charts where each data point also has a size value. ",columnrange:" Columnrange charts are column charts displaying a range between a lower and higher value for each point. ",errorbar:" Errorbar series are used to display the variability of the data. ",
funnel:" Funnel charts are used to display reduction of data in stages. ",pyramid:" Pyramid charts consist of a single pyramid with item heights corresponding to each point value. ",waterfall:" A waterfall chart is a column chart where each column contributes towards a total end value. "},D="name id domain x value y".split(" "),x="z open high q3 median q1 low close".split(" ");e.setOptions({accessibility:{enabled:!0,pointDescriptionThreshold:30,keyboardNavigation:{enabled:!0}}});e.wrap(e.Series.prototype,
"render",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));this.chart.options.accessibility.enabled&&this.setA11yDescription()});e.Series.prototype.setA11yDescription=function(){var a=this.chart.options.accessibility,b=this.points&&this.points[0].graphic&&this.points[0].graphic.element,d=b&&b.parentNode||this.graph&&this.graph.element||this.group&&this.group.element;d&&(d.lastChild===b&&k(d),this.points&&(this.points.length<a.pointDescriptionThreshold||!1===a.pointDescriptionThreshold)&&
h(this.points,function(c){c.graphic&&(c.graphic.element.setAttribute("role","img"),c.graphic.element.setAttribute("tabindex","-1"),c.graphic.element.setAttribute("aria-label",a.pointDescriptionFormatter&&a.pointDescriptionFormatter(c)||c.buildPointInfoString()))}),1<this.chart.series.length||a.describeSingleSeries)&&(d.setAttribute("role","region"),d.setAttribute("tabindex","-1"),d.setAttribute("aria-label",a.seriesDescriptionFormatter&&a.seriesDescriptionFormatter(this)||this.buildSeriesInfoString()))};
e.Series.prototype.buildSeriesInfoString=function(){var a=p[this.type]||p["default"],b=this.description||this.options.description;return(this.name?this.name+", ":"")+(1===this.chart.types.length?a[0]:"series")+" "+(this.index+1)+" of "+this.chart.series.length+(1===this.chart.types.length?" with ":". "+a[0]+" with ")+(this.points.length+" "+(1===this.points.length?a[1]:a[2]))+(b?". "+b:"")+(1<this.chart.yAxis.length&&this.yAxis?". Y axis, "+this.yAxis.getDescription():"")+(1<this.chart.xAxis.length&&
this.xAxis?". X axis, "+this.xAxis.getDescription():"")};e.Point.prototype.buildPointInfoString=function(){var a=this,b=a.series,d=b.chart.options.accessibility,c="",f=!1,g=b.xAxis&&b.xAxis.isDatetimeAxis,b=g&&B(d.pointDateFormatter&&d.pointDateFormatter(a)||d.pointDateFormat||e.Tooltip.prototype.getXDateFormat(a,b.chart.options.tooltip,b.xAxis),a.x);h(x,function(c){void 0!==a[c]&&(f=!0)});f?(g&&(c=b),h(D.concat(x),function(b){void 0===a[b]||g&&"x"===b||(c+=(c?". ":"")+b+", "+this[b])})):c=(this.name||
b||this.category||this.id||"x, "+this.x)+", "+(void 0!==this.value?this.value:this.y);return this.index+1+". "+c+"."+(this.description?" "+this.description:"")};e.Axis.prototype.getDescription=function(){return this.userOptions&&this.userOptions.description||this.axisTitle&&this.axisTitle.textStr||this.options.id||this.categories&&"categories"||"values"};e.Axis.prototype.panStep=function(a,b){var d=b||3,c=this.getExtremes(),f=(c.max-c.min)/d*a,d=c.max+f,f=c.min+f,g=d-f;0>a&&f<c.dataMin?(f=c.dataMin,
d=f+g):0<a&&d>c.dataMax&&(d=c.dataMax,f=d-g);this.setExtremes(f,d)};e.wrap(e.Series.prototype,"init",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));var b=this.chart;b.options.accessibility.enabled&&(b.types=b.types||[],0>b.types.indexOf(this.type)&&b.types.push(this.type),v(this,"remove",function(){var a=this,c=!1;h(b.series,function(f){f!==a&&0>b.types.indexOf(a.type)&&(c=!0)});c||y(b.types,a.type)}))});e.Chart.prototype.getTypeDescription=function(){var a=this.types&&this.types[0],
b=this.series[0]&&this.series[0].mapTitle;if(a){if("map"===a)return b?"Map of "+b:"Map of unspecified region.";if(1<this.types.length)return"Combination chart.";if(-1<["spline","area","areaspline"].indexOf(a))return"Line chart."}else return"Empty chart.";return a+" chart."+(C[a]||"")};e.Chart.prototype.getAxesDescription=function(){var a=this.xAxis.length,b=this.yAxis.length,d={},c;if(a)if(d.xAxis="The chart has "+a+(1<a?" X axes":" X axis")+" displaying ",2>a)d.xAxis+=this.xAxis[0].getDescription()+
".";else{for(c=0;c<a-1;++c)d.xAxis+=(c?", ":"")+this.xAxis[c].getDescription();d.xAxis+=" and "+this.xAxis[c].getDescription()+"."}if(b)if(d.yAxis="The chart has "+b+(1<b?" Y axes":" Y axis")+" displaying ",2>b)d.yAxis+=this.yAxis[0].getDescription()+".";else{for(c=0;c<b-1;++c)d.yAxis+=(c?", ":"")+this.yAxis[c].getDescription();d.yAxis+=" and "+this.yAxis[c].getDescription()+"."}return d};e.Chart.prototype.addAccessibleContextMenuAttribs=function(){var a=this.exportDivElements;a&&(h(a,function(a){"DIV"!==
a.tagName||a.children&&a.children.length||(a.setAttribute("role","menuitem"),a.setAttribute("tabindex",-1))}),a[0].parentNode.setAttribute("role","menu"),a[0].parentNode.setAttribute("aria-label","Chart export"))};e.Point.prototype.highlight=function(){var a=this.series.chart;this.graphic&&this.graphic.element.focus&&this.graphic.element.focus();this.isNull?a.tooltip.hide(0):(this.onMouseOver(),a.tooltip.refresh(a.tooltip.shared?[this]:this));a.highlightedPoint=this;return this};e.Chart.prototype.highlightAdjacentPoint=
function(a){var b=this.series,d=this.highlightedPoint;if(!b[0]||!b[0].points)return!1;if(!d)return b[0].points[0].highlight();b=b[d.series.index+(a?1:-1)];d=a?d.series.points[d.index+1]||b&&b.points[0]:d.series.points[d.index-1]||b&&b.points[b.points.length-1];return void 0===d?!1:d.isNull&&this.options.accessibility.keyboardNavigation&&this.options.accessibility.keyboardNavigation.skipNullPoints?(this.highlightedPoint=d,this.highlightAdjacentPoint(a)):d.highlight()};e.Chart.prototype.showExportMenu=
function(){this.exportSVGElements&&this.exportSVGElements[0]&&(this.exportSVGElements[0].element.onclick(),this.highlightExportItem(0))};e.Chart.prototype.highlightExportItem=function(a){var b=this.exportDivElements&&this.exportDivElements[a],d=this.exportDivElements&&this.exportDivElements[this.highlightedExportItem];if(b&&"DIV"===b.tagName&&(!b.children||!b.children.length)){b.focus&&b.focus();if(d&&d.onmouseout)d.onmouseout();if(b.onmouseover)b.onmouseover();this.highlightedExportItem=a;return!0}};
e.Chart.prototype.highlightRangeSelectorButton=function(a){var b=this.rangeSelector.buttons;b[this.highlightedRangeSelectorItemIx]&&b[this.highlightedRangeSelectorItemIx].setState(this.oldRangeSelectorItemState||0);this.highlightedRangeSelectorItemIx=a;return b[a]?(b[a].element.focus&&b[a].element.focus(),this.oldRangeSelectorItemState=b[a].state,b[a].setState(2),!0):!1};e.Chart.prototype.hideExportMenu=function(){var a=this.exportDivElements;if(a){h(a,function(a){A(a,"mouseleave")});if(a[this.highlightedExportItem]&&
a[this.highlightedExportItem].onmouseout)a[this.highlightedExportItem].onmouseout();this.highlightedExportItem=0;this.renderTo.focus()}};e.Chart.prototype.addKeyboardNavEvents=function(){function a(c){this.keyCodeMap=c.keyCodeMap;this.move=c.move;this.validate=c.validate;this.init=c.init;this.transformTabs=!1!==c.transformTabs}function b(b,g){return new a(u({keyCodeMap:b,move:function(a){c.keyboardNavigationModuleIndex+=a;var b=c.keyboardNavigationModules[c.keyboardNavigationModuleIndex];if(b){if(b.validate&&
!b.validate())return this.move(a);if(b.init)return b.init(a),!0}c.keyboardNavigationModuleIndex=0;c.slipNextTab=!0;return!1}},g))}function d(a){a=a||w.event;var b=c.keyboardNavigationModules[c.keyboardNavigationModuleIndex];9===(a.which||a.keyCode)&&c.slipNextTab?c.slipNextTab=!1:(c.slipNextTab=!1,b&&b.run(a)&&a.preventDefault())}var c=this;a.prototype={run:function(c){var a=this,b=c.which||c.keyCode,d=!1,b=this.transformTabs&&9===b?c.shiftKey?37:39:b;h(this.keyCodeMap,function(e){-1<e[0].indexOf(b)&&
(d=!1===e[1].call(a,b,c)?!1:!0)});return d}};c.keyboardNavigationModules=[b([[[37,39],function(a){if(!c.highlightAdjacentPoint(39===a))return this.move(39===a?1:-1)}],[[38,40],function(a){var b;if(c.highlightedPoint)if((b=c.series[c.highlightedPoint.series.index+(38===a?-1:1)])&&b.points[0])b.points[0].highlight();else return this.move(40===a?1:-1)}],[[13,32],function(){c.highlightedPoint&&c.highlightedPoint.firePointEvent("click")}]],{init:function(a){var b=c.series&&c.series[c.series.length-1],
b=b&&b.points&&b.points[b.points.length-1];0>a&&b&&b.highlight()}}),b([[[37,38],function(){for(var a=c.highlightedExportItem||0,b=!0,d=c.series;a--;)if(c.highlightExportItem(a)){b=!1;break}if(b)return c.hideExportMenu(),d&&d.length&&(a=d[d.length-1],a.points.length&&a.points[a.points.length-1].highlight()),this.move(-1)}],[[39,40],function(){for(var a=!0,b=(c.highlightedExportItem||0)+1;b<c.exportDivElements.length;++b)if(c.highlightExportItem(b)){a=!1;break}if(a)return c.hideExportMenu(),this.move(1)}],
[[13,32],function(){t(c.exportDivElements[c.highlightedExportItem])}]],{validate:function(){return c.exportChart&&!(c.options.exporting&&!1===c.options.exporting.enabled)},init:function(a){c.highlightedPoint=null;c.showExportMenu();if(0>a&&c.exportDivElements)for(a=c.exportDivElements.length;-1<a&&!c.highlightExportItem(a);--a);}}),b([[[38,40,37,39],function(a){c[38===a||40===a?"yAxis":"xAxis"][0].panStep(39>a?-1:1)}],[[9],function(a,b){var d;c.mapNavButtons[c.focusedMapNavButtonIx].setState(0);if(b.shiftKey&&
!c.focusedMapNavButtonIx||!b.shiftKey&&c.focusedMapNavButtonIx)return c.mapZoom(),this.move(b.shiftKey?-1:1);c.focusedMapNavButtonIx+=b.shiftKey?-1:1;d=c.mapNavButtons[c.focusedMapNavButtonIx];d.element.focus&&d.element.focus();d.setState(2)}],[[13,32],function(){t(c.mapNavButtons[c.focusedMapNavButtonIx].element)}]],{validate:function(){return c.mapZoom&&c.mapNavButtons&&2===c.mapNavButtons.length},transformTabs:!1,init:function(a){var b=c.mapNavButtons[0],d=c.mapNavButtons[1],b=0<a?b:d;h(c.mapNavButtons,
function(a,c){a.element.setAttribute("tabindex",-1);a.element.setAttribute("role","button");a.element.setAttribute("aria-label","Zoom "+(c?"out":"")+"chart")});b.element.focus&&b.element.focus();b.setState(2);c.focusedMapNavButtonIx=0<a?0:1}}),b([[[37,39,38,40],function(a){a=37===a||38===a?-1:1;if(!c.highlightRangeSelectorButton(c.highlightedRangeSelectorItemIx+a))return this.move(a)}],[[13,32],function(){3!==c.oldRangeSelectorItemState&&t(c.rangeSelector.buttons[c.highlightedRangeSelectorItemIx].element)}]],
{validate:function(){return c.rangeSelector&&c.rangeSelector.buttons&&c.rangeSelector.buttons.length},init:function(a){h(c.rangeSelector.buttons,function(a){a.element.setAttribute("tabindex","-1");a.element.setAttribute("role","button");a.element.setAttribute("aria-label","Select range "+(a.text&&a.text.textStr))});c.highlightRangeSelectorButton(0<a?0:c.rangeSelector.buttons.length-1)}}),b([[[9,38,40],function(a,b){var d=9===a&&b.shiftKey||38===a?-1:1,e=c.highlightedInputRangeIx+=d;if(1<e||0>e)return this.move(d);
c.rangeSelector[e?"maxInput":"minInput"].focus()}]],{validate:function(){return c.rangeSelector&&!1!==c.options.rangeSelector.inputEnabled&&c.rangeSelector.minInput&&c.rangeSelector.maxInput},transformTabs:!1,init:function(a){h(["minInput","maxInput"],function(a,b){c.rangeSelector[a]&&(c.rangeSelector[a].setAttribute("tabindex","-1"),c.rangeSelector[a].setAttribute("role","textbox"),c.rangeSelector[a].setAttribute("aria-label","Select "+(b?"end":"start")+" date."))});c.highlightedInputRangeIx=0<a?
0:1;c.rangeSelector[c.highlightedInputRangeIx?"maxInput":"minInput"].focus()}})];c.keyboardNavigationModuleIndex=0;c.renderTo.tabIndex||c.renderTo.setAttribute("tabindex","0");v(c.renderTo,"keydown",d);v(c,"destroy",function(){z(c.renderTo,"keydown",d)})};e.Chart.prototype.addScreenReaderRegion=function(a){var b=this,d=b.series,c=b.options,e=c.accessibility,g=b.screenReaderRegion=m.createElement("div"),h=m.createElement("h3"),q=m.createElement("a"),r=m.createElement("h3"),k={position:"absolute",left:"-9999px",
top:"auto",width:"1px",height:"1px",overflow:"hidden"},l=b.types||[],l=(1===l.length&&"pie"===l[0]||"map"===l[0])&&{}||b.getAxesDescription(),n=d[0]&&p[d[0].type]||p["default"];g.setAttribute("role","region");g.setAttribute("aria-label","Chart screen reader information.");g.innerHTML=e.screenReaderSectionFormatter&&e.screenReaderSectionFormatter(b)||'<div tabindex="0">Use regions/landmarks to skip ahead to chart'+(1<d.length?" and navigate between data series":"")+".</div><h3>Summary.</h3><div>"+
(c.title.text||"Chart")+(c.subtitle&&c.subtitle.text?". "+c.subtitle.text:"")+"</div><h3>Long description.</h3><div>"+(c.chart.description||"No description available.")+"</div><h3>Structure.</h3><div>Chart type: "+(c.chart.typeDescription||b.getTypeDescription())+"</div>"+(1===d.length?"<div>"+n[0]+" with "+d[0].points.length+" "+(1===d[0].points.length?n[1]:n[2])+".</div>":"")+(l.xAxis?"<div>"+l.xAxis+"</div>":"")+(l.yAxis?"<div>"+l.yAxis+"</div>":"");b.getCSV&&(q.innerHTML="View as data table.",
q.href="#"+a,q.setAttribute("tabindex","-1"),q.onclick=e.onTableAnchorClick||function(){b.viewData();m.getElementById(a).focus()},h.appendChild(q),g.appendChild(h));r.innerHTML="Chart graphic.";b.renderTo.insertBefore(r,b.renderTo.firstChild);b.renderTo.insertBefore(g,b.renderTo.firstChild);u(!0,r.style,k);u(!0,g.style,k)};e.Chart.prototype.callbacks.push(function(a){var b=a.options,d=b.accessibility;if(d.enabled){var c=m.createElementNS("http://www.w3.org/2000/svg","title"),f=m.createElementNS("http://www.w3.org/2000/svg",
"g"),g=a.container.getElementsByTagName("desc")[0],k=a.container.getElementsByTagName("text"),q="highcharts-title-"+a.index,r="highcharts-data-table-"+a.index,p=b.title.text||"Chart",l=b.exporting&&b.exporting.csv&&b.exporting.csv.columnHeaderFormatter,n=[];c.textContent=p;c.id=q;g.parentNode.insertBefore(c,g);a.renderTo.setAttribute("role","region");a.renderTo.setAttribute("aria-label",p+". Use up and down arrows to navigate.");if(a.exportSVGElements&&a.exportSVGElements[0]&&a.exportSVGElements[0].element){var t=
a.exportSVGElements[0].element.onclick,c=a.exportSVGElements[0].element.parentNode;a.exportSVGElements[0].element.onclick=function(){t.apply(this,Array.prototype.slice.call(arguments));a.addAccessibleContextMenuAttribs();a.highlightExportItem(0)};a.exportSVGElements[0].element.setAttribute("role","button");a.exportSVGElements[0].element.setAttribute("aria-label","View export menu");f.appendChild(a.exportSVGElements[0].element);f.setAttribute("role","region");f.setAttribute("aria-label","Chart export menu");
c.appendChild(f)}h(k,function(a){a.setAttribute("aria-hidden","true")});a.addScreenReaderRegion(r);d.keyboardNavigation&&a.addKeyboardNavEvents();u(!0,b.exporting,{csv:{columnHeaderFormatter:function(a,c,b){var d=n[n.length-1];1<b&&(d&&d.text)!==a.name&&n.push({text:a.name,span:b});return l?l.call(this,a,c,b):1<b?c:a.name}}});e.wrap(a,"getTable",function(a){return a.apply(this,Array.prototype.slice.call(arguments,1)).replace("<table>",'<table id="'+r+'" summary="Table representation of chart"><caption>'+
p+"</caption>")});e.wrap(a,"viewData",function(a){if(!this.insertedTable){a.apply(this,Array.prototype.slice.call(arguments,1));var c=m.getElementById(r),b=c.getElementsByTagName("tbody")[0],d=b.firstChild.children,e="<tr><td></td>",f,g;c.setAttribute("tabindex","-1");h(b.children,function(a){f=a.firstChild;g=m.createElement("th");g.setAttribute("scope","row");g.innerHTML=f.innerHTML;f.parentNode.replaceChild(g,f)});h(d,function(a){"TH"===a.tagName&&a.setAttribute("scope","col")});n.length&&(h(n,
function(a){e+='<th scope="col" colspan="'+a.span+'">'+a.text+"</th>"}),b.insertAdjacentHTML("afterbegin",e))}})}})})(k)});