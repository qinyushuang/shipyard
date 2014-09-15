'use strict';
function truncate(t) {
   if (t.length < 12) {
       return t;
   }
   return t.substring(0, 12);
}

angular.module('shipyard.filters', [])
    .filter('truncate', function () {
        return function (t) {
            if (t == undefined) {
                return "";
            }
            return truncate(t);
        };
    })
    .filter('parseUrl', function () {
        return function (u) {
            if (u == undefined) {
                return "";
            }
            var h = document.createElement('a');
            h.href = u;
            var l = {};
            l.protocol = h.proto;
            l.port = h.port;
            l.hostname = h.hostname;
            return l
        };
    })
    .filter('formatMemory', function () {
        return function (s) {
            if (s == undefined) {
                return "";
            }
            return s + " MB";
        };
    })
    .filter('formatEvent', function () {
        return function (e) {
            var evt = "";
            evt += e.type + " ";
            if (e.container !== undefined) {
                evt += truncate(e.container.id) + " " + e.container.image.name + " ";
            } else if (e.engine !== undefined) {
                evt += e.engine.id + " (" + e.engine.addr + ") ";
            } else {
                if (e.message !== undefined) {
                    evt += e.message + " ";
                }
            }
            return evt;
        };
    })
    .filter('eventCssClass', function () {
        return function (t) {
            var cls = "";
            switch(t) {
                case 'die':
                    cls = "off red";
                    break;
                case 'kill':
                    cls = "off red";
                    break;
                case 'start':
                    cls = "checkmark green";
                    break;
                case 'create':
                    cls = "add blue";
                    break;
                case 'restart':
                    cls = "refresh blue";
                    break;
                case 'add-engine':
                    cls = "cloud upload green";
                    break;
                case 'remove-engine':
                    cls = "remove";
                    break;
                case 'add-service-key':
                    cls = "lock green";
                    break;
                case 'remove-service-key':
                    cls = "remove red";
                    break;
                default:
                    cls = "text file"
            }
            return cls;
        };
    });
