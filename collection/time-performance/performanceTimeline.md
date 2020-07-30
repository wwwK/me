网页开发每天与浏览器相伴，一切展示来自于各类资源的加载。性能优化一定要有衡量指标，所谓“一切有据（数据）可循”，那么 PerformanceResourceTiming 则是你不容错过的一个官方 API。

>我们从不生产官方文档，我们只做官方文档的搬运工。

本瓜**倾情翻译**、**适量批注**、**莞尔小结**，以供分享，烦请指正。撰文不易，点赞👍鼓励！

[原文：https://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming](https://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming)
# 前言
## 介绍
**用户延迟是 Web 应用程序的重要质量基准**。尽管基于 JavaScript 的机制可以为应用程序中的用户延迟测量提供全面的工具，但在许多情况下，它们无法提供完整的端到端**延迟剪影**。本文档介绍了PerformanceResourceTiming 接口：允许 JavaScript 收集与文档资源相关的完整定时信息。

例如，以下演示了简单通过 JavaScript 来尝试获取资源所花费的时间的方法：
```
<!doctype html>
<html>
  <head>
  </head>
  <body onload="loadResources()">
    <script>
        function loadResources()
        {
           var start = new Date().getTime();
           var image1 = new Image();
           var resourceTiming = function() {
               var now = new Date().getTime();
               var latency = now - start;
               alert("End to end qresource fetch: " + latency);
           };

           image1.onload = resourceTiming;
           image1.src = 'https://www.w3.org/Icons/w3c_main.png';
        }
    </script>
    <img src="https://www.w3.org/Icons/w3c_home.png">
  </body>
</html>
```
尽管此脚本可以获取资源所花费的时间，但是它不能分解在各个阶段花费的时间。此外，脚本无法轻松获取标记中描述的资源所花费的时间。

为了满足有关用户体验的完整信息的需求，本文档将介绍**PerformanceResourceTiming**。此接口允许 JavaScript 在应用程序中提供完整的客户端延迟测量。使用此接口，可以修改前面的示例以测量用户感知的资源加载时间。

```
<!doctype html>
<html>
  <head>
  </head>
  <body onload="loadResources()">
    <script>
       function loadResources()
       {
          var image1 = new Image();
          image1.onload = resourceTiming;
          image1.src = 'https://www.w3.org/Icons/w3c_main.png';
       }

       function resourceTiming()
       {
           var resourceList = window.performance.getEntriesByType("resource");
           for (i = 0; i < resourceList.length; i++)
           {
              if (resourceList[i].initiatorType == "img")
              {
                 alert("End to end resource fetch: "+ resourceList[i].responseEnd - resourceList[i].startTime);
              }
           }
       }
    </script>
    <img id="image0" src="https://www.w3.org/Icons/w3c_home.png">
  </body>
</html>
```
## 文档规范

* ps: 此段为撰文规范说明，可选跳过。

除标记、指南，图表，示例和注释为非规范。本规范中的所有其他内容都是符合规范标准的。

关键字may，must，must not 和 should 的解释应如[ RFC2119 ](https://www.w3.org/TR/resource-timing/#bib-RFC2119)中所述。

对于一部分算法命令应当做如下要求：（例如 “删除任何前导空格字符” 或 “返回 false 并中止这些步骤” ）应使用关键字的含义（“必须”，“应”，“may” 等）来介绍算法。

一些对属性，方法或对象的一致性表述要求，应类比于对客户端的要求。

只要最终结果是等效的，可以用任何方式表述算法或特定步骤的一致性要求。（本规范中定义的算法旨在于遵循标准，而非标新立异。）

如 Web IDL 规范中所述，此规范中的 IDL 片段必须按照符合 IDL 片段的要求进行解释。[WebIDL](https://www.w3.org/TR/resource-timing/#bib-WebIDL)

## 表述解释
* ps: 此段对一些文档表述上可能存在的歧义作出了解释，可选跳过。

有时使用 Foo 实际上是指接口的构造 “a Foo object”，而不是指精确意义上的“Foo 接口对象的实现”。

表述 DOM 用于表示Web 应用程序中的脚本的 API 集，并且不一定表示实际上的 Document 对象或 NodeDOM 规范中定义的任何其他对象。[DOM](https://www.w3.org/TR/resource-timing/#bib-DOM)

DOM 属性正在获取值时被称为“正在获取值”，分配新值时被称为“正在设置”。

由于 JavaScript 更为广为人知，因此表述 JavaScript 用于表示 ECMA262，而不是官方表述 ECMAScript。[ECMA-262](https://www.w3.org/TR/resource-timing/#bib-ECMA-262)

在整个说明书中，术语 “ 资源 ” 用于指代元素和任何其他用户主动获取的。例如，资源可能源 自XMLHttpRequest 对象，HTML元素 [HTML51](https://www.w3.org/TR/resource-timing/#bib-HTML51)（例如iframe，img，脚本，对象，嵌入和具有样式表链接类型的链接）以及SVG元素[SVG11](https://www.w3.org/TR/resource-timing/#bib-SVG11) 。

表述“跨原点” 用于表示[不同的原点](https://tools.ietf.org/html/rfc6454#section-5)。

表述“当前文档”是指与 Window 对象的最新 [Document 对象关联的文档](https://html.spec.whatwg.org/multipage/browsers.html#dom-window-document)。

在整个工作过程中，自开始浏览文档[HR-TIME-2](https://www.w3.org/TR/resource-timing/#bib-HR-TIME-2) 以来，所有时间值均以毫秒为单位。

术语“ 当前时间”是指从文档开始导航到当前时间点之间的毫秒数。

>注意:
时间的定义基于高分辨率时间规范[ HR-TIME-2 ]，并且与导航时间规范[ NAVIGATION-TIMING ]中使用的时间定义不同 ，后者的时间以自1970（UTC）年1月1日午夜起的毫秒数为单位。

# 正文-Resource Timing
## 概述

PerformanceResourceTiming 接口有助于对可下载资源进行定时测量。例如，资源可能源 自XMLHttpRequest 对象，HTML元素 [HTML51](https://www.w3.org/TR/resource-timing/#bib-HTML51)（例如 iframe，img，脚本，对象，嵌入和具有样式表链接类型的链接）以及SVG元素[SVG11](https://www.w3.org/TR/resource-timing/#bib-SVG11)。

## PerformanceResourceTiming Resources
所有通过浏览 [HTML5] 或工作程序 [WORKERS] 上下文所获取的资源都必须在 Performance Timeline 中包含  PerformanceResourceTiming 对象，且不违反同源策略。从相关应用程序缓存中检索的资源或本地资源也必须在 Performance Timeline 中包括 PerformanceResourceTiming 对象。[PERFORMANCE-TIMELINE-2](https://www.w3.org/TR/resource-timing/#bib-PERFORMANCE-TIMELINE-2)

>备注：该规范的未来版本可能需要包括中止的请求或不返回响应的请求。[详见 issues 12 ](https://github.com/w3c/resource-timing/issues/12)

>备注：开发者应注意 Issue 27：[同源政策和遵守不跨域获取](https://github.com/w3c/resource-timing/issues/27)。

以下是特殊情况

例如：
If a resource fetch is aborted because it failed a fetch precondition (e.g. mixed content, CORS restriction, CSP policy, etc), then this resource will not be included as a PerformanceResourceTiming object in the Performance Timeline.

* 如果两个相同规范的 URL 被当作两个 HTML IMG 元素的 src 属性，则获取第一个HTML元素的图片资源会包含 Performance Timeline 对象。客户端可能不会重复请求 URL 来获取第二个 HTML IMG 元素，而是使用第一个元素的本地下载。在这种情况下，只有第一个元素的对资源获取有 Performance Timeline 对象。
* 如果一个 HTML IMG 元素 src 属性是通过脚本改变，无论是获取原始资源，还是获取新的URL将在 Performance Timeline 中包含 PerformanceResourceTiming 对象。
* 如果 IFRAME 通过标签添加到 HTML 中 而未指定 src 属性，则客户端可以为加载 about:blank DOM。如果随后 src 属性 又通过脚本被动态更改，则客户端可以获取的新 IFRAME URL 资源。在这种情况下，仅新 URL 的在 Performance Timeline 中包含 PerformanceResourceTiming 对象。
* 如果相同 XMLHttpRequest 请求了两次，则资源的获取两次都将在 Performance Timeline 包含 PerformanceResourceTiming 对象。这是因为第二个资源的获取异步请求无法重用第一个资源的下载的异步请求。 
* 如果页面包含 IFRAME 元素，则仅在包含 src 属性的时候在 Performance Timeline 包含 PerformanceResourceTiming 对象。IFRAME 文件要求子资源将包含在IFRAME 文件 的 Performance Timeline 中，而不是父文档的 Performance Timeline 表中。
* 如果HTML IMG 元素 data: URI 的来源为[ RFC2397 ]，则该资源不会在Performance Timeline 包含 PerformanceResourceTiming 对象。根据定义，它 data: URI 包含嵌入式数据，不需要获取。
* 如果资源获取由于网络错误（例如DNS，TCP或TLS错误）而中止，则该资源的获取将在Performance Timeline 包含 PerformanceResourceTiming 对象，并且初始化属性值一直到故障点（例如TCP握手）错误应报告该请求的 DNS 时间戳，依此类推。
* 如果由于获取先决条件（例如，混合内容，CORS限制，CSP策略等）失败而导致资源获取中止，则该资源不会在 Performance Timeline 中包含 PerformanceResourceTiming 对象。

## The PerformanceResourceTiming
**本文关键之一**

PerformanceResourceTiming 接口在 Performance Timeline 面板上有展现，并且其扩展 PerformanceEntry 接口有以下属性：
* name：这个属性必须返回请求资源的解析URL。如果重定向到其他URL，此属性也不更改。
* entryType：entryType属性返回 DOMString "resource"。
* startTime：startTime属性返回一个 DOMHighResTimeStamp [ HR-TIME-2 ]，表示用户代理获取资源开始排队等待之前的时间。如果在获取资源时存在 HTTP 重定向或类同情况，并且所有重定向或类同情况都来自与当前文档同源，或者通过了[timing allow check](https://www.w3.org/TR/resource-timing/#timing-allow-check) 算法，则此属性返回 redirectStart 的值。否则，此属性返回 fetchStart 的值。
* duration：该duration属性返回一个 DOMHighResTimeStamp，等于 responseEnd 和 startTime 之间的差。
```
[Exposed=(Window)]
interface PerformanceResourceTiming : PerformanceEntry {
    readonly attribute DOMString           initiatorType;
    readonly attribute DOMHighResTimeStamp redirectStart;
    readonly attribute DOMHighResTimeStamp redirectEnd;
    readonly attribute DOMHighResTimeStamp fetchStart;
    readonly attribute DOMHighResTimeStamp domainLookupStart;
    readonly attribute DOMHighResTimeStamp domainLookupEnd;
    readonly attribute DOMHighResTimeStamp connectStart;
    readonly attribute DOMHighResTimeStamp connectEnd;
    readonly attribute DOMHighResTimeStamp secureConnectionStart;
    readonly attribute DOMHighResTimeStamp requestStart;
    readonly attribute DOMHighResTimeStamp responseStart;
    readonly attribute DOMHighResTimeStamp responseEnd;
    serializer = {inherit, attribute};
};
```
获取时，initiatorType 属性返回情况如下：
 
1. 如果初始者是 element，则返回 element[ DOM ] 的 localName 值。
2. 如果初始者是通过url()[ CSS-SYNTAX-3 ] 语法下载的 CSS 资源，例如@import url()或background: url()，则返回"css"。
3. 如果初始者是是XMLHttpRequest对象[ XHR ]，则返回 "xmlhttprequest"。

* 获取时，redirectStart 属性返回情况如下：
1. 如果在获取资源时存在HTTP重定向或类同情况，并且所有重定向或类同情况均通过 timing allow check 算法，则返回客户端程序即将开始获取用于启动重定向的资源的时间。

2. 其他情况，返回 0 。

* 获取时，redirectEnd 属性返回情况如下：

1. 如果在获取资源时存在HTTP重定向或类同情况，并且所有重定向或类同情况均通过 timing allow check 算法，则返回：在接收到最后一个重定向的响应的最后一个字节之后的时间。
2. 其他情况，返回 0 。

* 获取时，fetchStart 属性必须返回情况如下：

1. 如果存在HTTP重定向或类同情况，则返回：客户端在紧靠重定向开始获取最终资源之前的时间。
2. 其他情况，返回：客户端立即开始获取资源之前的时间。

* 获取时，domainLookupStart 属性返回情况如下：

1. 如果使用持久连接 [ RFC7230 ]或从相关的应用程序缓存或本地资源中检索资源，则返回 fetchStart 值。
2. 如果客户端在高速缓存中包含域信息，则返回：从客户端在对应域下信息高速缓存中检索开始的时间。
3. 如果资源的最后一次非重定向获取通过了 timing allow check，则返回：紧靠客户端程序开始在域名下的资源查找之前的时间。
4. 其他情况，返回 0 。

* 获取时，domainLookupEnd 属性返回情况如下：

1. 如果使用持久连接 [ RFC7230 ]或从相关的应用程序缓存或本地资源中检索资源，则返回 fetchStart 值。
2. 如果客户端在缓存中包含域信息，则返回：从客户端在对应域下信息缓存中的数据检索结束的时间。
3. 如果资源的最后一次非重定向获取通过了timing allow check，则返回：紧接客户端完成在域名下的资源查找之前的时间。
4. 其他情况，返回 0 。

* 获取时，connectStart 属性返回情况如：

1. 如果使用持久连接 [ RFC7230 ]或从相关的应用程序缓存或本地资源中检索资源，则返回 fetchStart 值。
2. 如果资源的最后一次非重定向获取通过了timing allow check 算法，则返回：客户端程序开始与服务器建立连接检索资源之前的时间。
如果传输连接失败，并且客户端重新打开连接，则应返回新连接的相应 connectStart 值。
3. 其他情况，返回 0 。

* 获取时，connectEnd 属性返回情况如：

1. 如果使用持久连接 [ RFC7230 ]或从相关的应用程序缓存或本地资源中检索资源，则返回 fetchStart 值。
2. 返回：客户端开始与服务器建立连接以检索资源消耗的时间（如果最后一次非重定向的资源获取通过timing allow check 算法）。
返回的时间必须包括建立传输连接的时间间隔，以及其他时间间隔，例如 SSL 握手和 SOCKS 身份验证的时间间隔。
如果传输连接失败，并且客户端重新打开连接，则应返回新连接的相应 connectEnd 值。
3. 其他情况，返回 0 。

* secureConnectionStart 属性是可选的。获取时，属性返回情况如下：

1. 如果使用持久连接 [ RFC7230 ]或从相关的应用程序缓存或本地资源中检索资源，则返回 fetchStart 值。
2. 如果使用了安全传输，并且资源的最后一次非重定向获取通过了timing allow check，则返回：客户端程序立即开始握手过程来确保当前连接是安全的时间。
3. 其他情况，返回 0 。

* 获取时，requestStart 属性返回情况如下：

1. 如果最后一次非重定向的资源获取通过了 timing allow check 算法，则返回客户端程序开始从服务器在 相关的应用程序缓存或从本地资源请求资源之前 的时间。
2. 如果发送请求后传输连接失败，并且用户代理重新打开连接并重新发送请求，则必须返回新请求的相应 requestStart 值。
3. 其他情况，返回 0 。

>注意
<br>
>* 该接口不包含：发送请求完成的属性，例如 requestEnd。
从客户端发送请求的完成并不总是示网络传输中相应的完成时间，这让 requestEnd 属性有了更大作用。
>* 由于 HTTP 层的封装，某些客户端要花费很高的成本来确定发送请求的实际完成时间。

* 获取时，responseStart 属性返回情况如下：

1. 返回：客户端从相关应用程序缓存，本地资源或服务器（此最后一次的资源获取是非重定向的，且通过 timing allow check 算法）接收到响应的第一个字节之后紧接的时间。
2. 其他情况，返回 0 。

* 获取时，responseEnd 属性返回情况如下：
1. 返回：客户端收到响应的最后一个字节之后或关闭传输连接之前的时间，以先到者为准。如果资源的最后一次非重定向获取通过了 timing allow check 算法，则可以从相关的应用程序缓存，本地资源或服务器接收此处的资源。
2. 其他情况，返回 0 。

这一小节结束：主要是 PerformanceEntry 的各个属性的各种返回值罗列情况。

这里不得不说人家文档就是规范。

且这里得挖个坑🕳，[timing allow check algorithm](https://www.w3.org/TR/resource-timing/#timing-allow-check)，后续研究一下！

## Performance 接口扩展

客户端可以选择在 [Performance Timeline](https://www.w3.org/TR/performance-timeline-2/#performance-timeline)[ PERFORMANCE-TIMELINE-2 ]中限制 PerformanceResourceTiming 对象 。本节扩展了 Performance 界面，以允许控制更多 PerformanceResourceTiming 存储对象。

建议的最小 PerformanceResourceTiming 对象数是150，客户端可以更改，通过 setResourceTimingBufferSize 方法也可以更改此限制。

每个 ECMAScript 全局环境都具有：

* ** resource timing buffer size limit **（资源定时缓冲器大小限制），最初应当150或更大。
* **resource timing buffer current size**（缓冲器当前大小的资源的定时），最初为0。
* **resource timing buffer full flag**（资源计时缓冲区已满标志），最初为false。
* **performance entry buffer**（展示入口缓冲） 存储 PerformanceEntry 对象。最初是空的。

>注意
<br>
> 这里的**缓冲**与[ PERFORMANCE-TIMELINE-2 ]中定义的性能条目**缓冲**意义相同。

```
partial interface Performance {
    void clearResourceTimings();
    void setResourceTimingBufferSize(unsigned long maxSize);
    attribute EventHandler onresourcetimingbufferfull;
};
```
[Performance 对象](https://www.w3.org/TR/hr-time-2/#performance)是定义在 [HR-TIME-2]。

clearResourceTimings 方法实现过程：

1. 删除 performance entry buffer 中所有的 PerformanceResourceTiming 对象。
2. 将资源定时缓冲区的当前大小设置为0。
3. 将资源计时缓冲区已满标志设置为false。

setResourceTimingBufferSize 方法实现过程：

1. 将资源计时缓冲区大小限制设置为maxSize参数。如果 maxSize 参数小于资源定时缓冲区的当前大小，则不会从 performance entry buffer 中删除任 何PerformanceResourceTiming 对象。
2. 将资源计时缓冲区已满标志设置为false。

onresourcetimingbufferfull 属性是 resourcetimingbufferfull事件的事件处理程序。

要 在performance entry buffer 中添加 PerformanceResourceTiming 条目（新条目），需进行以下步骤：

1. 如果资源定时缓冲区当前大小小于资源定时缓冲区大小限制，请运行以下子步骤：
    a. 将新条目添加到性能条目缓冲区。
    b. 将资源定时缓冲区当前大小增加。
2. 另外，如果资源计时缓冲区已满标志为false，请运行以下子步骤：
    a. 在文档上触发一个名为 resourcetimingbufferfull 的简单事件，其 bubbles属性初始化为 true，并且没有默认操作。
    b. 将资源计时缓冲区已满标志设置为true。

## 跨域资源
**前文提到较多的 timing allow check 在这里有解释**

Timing-Allow-Origin HTTP 响应报头字段用于通信被允许看到，由于跨域限制属性的值为0。header 值由以下 ABNF [ RFC5234 ] 定义：

>that would have been zero due to the cross-origin restrictions. The header's value is represented by the following ABNF [RFC5234]:

      Timing-Allow-Origin = 1＃（原点为空/通配符）

发送者可以生成多个 Timing-Allow-Origin header 字段。接收者可以通过按顺序将每个随后的字段值附加到组合的字段值上并用逗号分隔，来组合成一个包含多个 Timing-Allow-Origin header 字段。

**timing allow check** 算法，该算法检查是否一个资源的定时信息可以在当前文档共享，如下：

1. 如果资源来自同一来源，则返回 pass。
2. 如果 Timing-Allow-Origin header值列表包含与当前文档的值或通配符（“ ”）匹配项（区分大小写），则返回 pass。
3. 其他情况，返回 fail。

# 实现过程
## 处理模型
**原理即是核心啦！**

下图说明了从不同源获取资源时 PerformanceResourceTiming 接口定义的时序属性。带下划线的属性可能不可用。客户端可以在定时之间执行内部处理，这允许定时之间存在非标准间隔。

![](https://user-gold-cdn.xitu.io/2020/6/24/172e55bda19d8536?w=886&h=372&f=png&s=29009)

对于 performance timelime 包含的每个资源，执行以下步骤：

1. 创建一个新 PerformanceResourceTiming 对象，并 将为DOMString resource 设置 entryType 。
2. 在客户端开始将资源排队等待检索之前，在 startTime 中记录当前时间。
3. 在 initiatorType 中记录初始 initiator。
4. 在 name 中记录请求资源的解析URL。
5. 在客户端立即开始获取过程之前，将当前时间记录为 fetchStart。让 domainLookupStart，domainLookupEnd，connectStart 、connectEnd 和 fetchStart 的值相同。
6. 如果客户端要重用来自当前文档的另一个现有或已完成的访存中的数据，将中止其余步骤。
7. 如果由于任何原因中止获取资源，将中止其余步骤。
8. 如果最后不重定向获取资源的失败时机允许检查，客户端需设置 redirectStart， redirectEnd， domainLookupStart， domainLookupEnd， connectStart， connectEnd， requestStart， responseStart和 secureConnectionStart为零，并跳转到步骤 17。
9. 让 domainLookupStart， domainLookupEnd， connectStart、connectEnd 和 fetchStart 的值相同。
10. 如果从相关的应用程序缓存或本地资源（包括HTTP缓存 [ RFC7234 ] ）中获取资源，将转到步骤 15。
11. 如果不需要查找域，直接跳转到步骤13。否则，在客户端立即开始域名查找之前，将时间记录为 domainLookupStart。
12. 域名查找成功后立即记录 domainLookupEnd 时间。客户端在此之前可能需要多次重试。如果域查找失败，将中止其余步骤。
13. 如果使用持久性传输连接来获取资源，则设 connectStart 和 connectEnd 为 domainLookupEnd 相同的值。否则，将时间记录为 connectStart 刚开始与服务器的连接之前的时间， 并记录 connectEnd 为 立即建立与服务器或代理的连接之后的时间。浏览器在此时间之前可能需要多次重试。如果无法建立连接，将中止其余步骤。
14. 如果支持，则客户端必须按如下所示设置 secureConnectionStart 属性：
① 当使用安全传输时，客户端将记录 secureConnectionStart 为安全握手过程之前的时间。
② 当不使用安全传输时，客户端将设置设置 secureConnectionStart 为 0。
15. 在客户端立即开始发送对资源的请求之前，将当前时间记录为 requestStart。
16. 在用户代理收到响应的第一个字节后立即记录时间，记录时间为 responseStart。
17. 在收到响应的最后一个字节后立即记录时间 responseEnd。
① 如果客户端未能发送请求或接收整个响应，并且需要重新打开连接，请返回步骤 13。
>例子3
<br>
当持久连接 [ RFC7230 ]被启用，客户端可以首先尝试重新使用开放连接发送请求，而连接可以被异步地关闭。在这种情况下，connectStart，connectEnd 和 requestStart 应该表示收集的重新打开的连接的定时信息。
18. 在过程中，记录 responseEnd 和 startTime 的差值。
19. 如果获取的资源导致HTTP重定向或类似的情况 ，则
① 如果当前的资源和重定向的资源不是来自同一源、或同一文档或未通过 timing allow check 算法，则设置 redirectStart 和 redirectEnd 为 0，然后，返回步骤 5 的新资源。
②如果未设置 redirectStart 的值，则将其设为 fetchStart 的值。
③令 redirectEnd 为 responseEnd 的值。
④在所有的属性设置 PerformanceResourceTiming 对象为0，除了tartTime、redirectStart， redirectEnd，和initiatorType。
⑤查询新资源返回步骤5。
20. 添加 PerformanceResourceTiming 对象

## 单调时间
**Monotonic clock(time) 字面意思是单调时间，实际上它指的是从某个点开始后（比如系统启动以后）流逝的时间**

定时属性的值必须单调增加，以确保在获取资源时不会因调整系统时钟而使定时属性产生偏移量。任何两个按时间顺序记录的计时属性之间的差异绝不能为负。对于所有资源（包括子文档资源），浏览器必须在根文档导航开始时记录系统时钟，并根据测量从导航开始起经过的时间的单调时钟来定义后续的计时属性。
# 其它
## 隐私与安全
PerformanceResourceTiming 界面将资源的计时信息公开给已请求该资源的任何网页或工作者。为了限制对 PerformanceResourceTiming 接口的访问，默认情况下会强制执行相同的原始策略，并将某些属性设置为零，如在 跨域资源中所述。资源提供者可以通过添加 Timing-Allow-Origin HTTP 响应头来明确允许收集资源的所有时序信息，该请求头指定允许访问时序信息的域。

统计指纹识别是一种隐私问题，在这种情况下，恶意网站可能会通过测量第三方网站中缓存命中和资源丢失的时间来确定用户是否访问了第三方网站。尽管 PerformanceResourceTiming 接口提供了文档中资源的时序信息，但是跨域限制防止这种隐私问题比现今使用资源上的加载事件来测量时序以确定高速缓存命中和未命中的情况更为严重。
>Though the PerformanceResourceTiming interface gives timing information for resources in a document, the cross-origin restrictions prevent making this privacy concern any worse than it is today using the load event on resources to measure timing to determine cache hits and misses.
## 致谢与引用
* [致谢](https://www.w3.org/TR/resource-timing/#acknowledgments)
* [引用](https://www.w3.org/TR/resource-timing/#references)

## 小结

不得不说官方文档写的真的严谨，自己在翻译的过程中，也是对自己编写文档能力是一种提升！

另结，以下指标在开发任一网站都尽量去关注，养成好习惯：

```
DNS查询耗时 ：domainLookupEnd - domainLookupStart
TCP链接耗时 ：connectEnd - connectStart
request请求耗时 ：responseEnd - responseStart
解析dom树耗时 ： domComplete - domInteractive
白屏时间 ：responseStart - navigationStart
domready时间(用户可操作时间节点) ：domContentLoadedEventEnd - navigationStart
onload时间(总下载时间) ：loadEventEnd - navigationStart
```
期望：以后多接触前端监控（不限于性能监控）啦！