(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(2630)}])},2630:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return h}});var r=e(5893);e(7294);var i=e(7014),s=e(3639),o=e(6885),u={height:"40vh"},a={float:"left",width:"50%",height:"100%"},c={width:"80%",margin:"1% auto"},l=function(){var t=(0,o.useRouter)(),n=(0,s.zO)();if("loading"===n.status)return(0,r.jsx)("span",{children:"Loading..."});if("error"===n.status)return(0,r.jsxs)("span",{children:["Error: ",n.error.message]});var e=n.data.sort(function(t,n){return new Date(t.date).getTime()-new Date(n.date).getTime()})[0];return(0,r.jsxs)("div",{style:u,children:[(0,r.jsx)("div",{style:a,children:(0,r.jsxs)(i.Zb,{style:{height:"100%"},children:[(0,r.jsx)(i.zx,{style:c,color:"gray",onClick:function(){return t.push("/list")},children:"Show tasks"}),(0,r.jsx)(i.zx,{style:c,color:"gray",onClick:function(){return t.push("/timeline")},children:"Show timeline"}),(0,r.jsx)(i.zx,{style:c,color:"gray",onClick:function(){return t.push("/calendar")},children:"Show calendar"}),(0,r.jsx)(i.zx,{style:c,onClick:function(){return t.push("/create")},children:"Create task"})]})}),(0,r.jsx)("div",{style:a,children:(0,r.jsxs)(i.Zb,{style:{height:"100%",textAlign:"center"},children:[(0,r.jsx)("h5",{className:"text-2xl font-bold tracking-tight text-gray-900 dark:text-white",children:"Next task to do"}),(0,r.jsx)("p",{className:"font-normal text-gray-700 dark:text-gray-400",children:e?e.name+" before "+(0,s.LM)(e.date):"No task to do"})]})})]})},h=function(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(l,{})})}},3639:function(t,n,e){"use strict";e.d(n,{LM:function(){return u},p6:function(){return a},zO:function(){return c}});var r=e(381),i=e.n(r),s=e(8767),o=e(2491),u=function(t){return i()(t).format("DD MMMM YY")},a=function(t){return i()(t).format("yy-MM-DD")},c=function(){return(0,s.useQuery)("todoList",o.Jv)}}},function(t){t.O(0,[885,774,888,179],function(){return t(t.s=8312)}),_N_E=t.O()}]);