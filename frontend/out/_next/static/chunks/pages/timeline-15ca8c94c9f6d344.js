(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[463],{1086:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/timeline",function(){return e(1319)}])},1319:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return o}});var r=e(5893);e(7294),e(5581);var i=e(7014),u=e(3639),s=function(n){var t=n.task;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(i.TY.Item,{children:(0,r.jsxs)(i.TY.Content,{children:[(0,r.jsx)(i.TY.Time,{children:(0,u.LM)(t.date)}),(0,r.jsx)(i.TY.Title,{children:t.name})]})})})},a={display:"flex",justifyContent:"center",alignItems:"center"},c=function(){var n=(0,u.zO)();return"loading"===n.status?(0,r.jsx)("span",{children:"Loading..."}):"error"===n.status?(0,r.jsxs)("span",{children:["Error: ",n.error.message]}):n.data?(0,r.jsx)("div",{style:a,children:(0,r.jsx)(i.TY,{children:n.data.sort(function(n,t){return new Date(n.date).getTime()-new Date(t.date).getTime()}).map(function(n,t){return(0,r.jsx)(s,{task:n},t)})})}):(0,r.jsx)(r.Fragment,{})},o=function(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(c,{})})}},3639:function(n,t,e){"use strict";e.d(t,{LM:function(){return a},p6:function(){return c},zO:function(){return o}});var r=e(381),i=e.n(r),u=e(8767),s=e(2491),a=function(n){return i()(n).format("DD MMMM YY")},c=function(n){return i()(n).format("yy-MM-DD")},o=function(){return(0,u.useQuery)("todoList",s.Jv)}}},function(n){n.O(0,[885,581,774,888,179],function(){return n(n.s=1086)}),_N_E=n.O()}]);