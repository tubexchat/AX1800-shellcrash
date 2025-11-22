# BPB Panel 配置

BPB Panel是一款基于Cloudflare Worker边缘计算的代理软件，当一个设备（电脑或路由器）添加代理设置后，审查系统（如 GFW）在网络边界进行检测时，看到的只是从您的设备发出的、加密的、目标是 Cloudflare IP 的 HTTPS 流量。由于 Cloudflare 是全球最大的 CDN 和安全服务商，其 IP 承载着海量的合法流量，审查系统通常无法或不愿轻易封锁 Cloudflare 的 IP，这使得代理流量得以安全通过。

但由于是通过Cloudflare CDN的网络的边缘IP发出网络请求，但是由于大量的网站自身部署在Cloudflare，为防止循环请求这就导致在原生环境中部署在Cloudflare的代理无法访问部署在Cloudflare上的网页，如：cloudflare.com/javbus.com/x.com，所以我们通过配置Proxy IP来规避这一问题，以甬哥的nat64混淆代码为例，它提供了www.visa.com/cis.visa.com/africa.visa.com等13个与VISA相关的域名，看起来像是在访问一个全球性的、高度敏感的金融服务网站。最终通过Cloudflare CDN的边缘IP发出抵达最近的真实网站服务器。

但是这种方式对于某些大厂责可能无效如：Google、Tiktok、Claude等。这里我们就要讲讲互联网中诡异的”送中“现象。这是最常见的原因。如果这个 IP 段（或这个特定的 IP）被大量讲中文的用户使用（例如用作梯子/VPN），并且这些用户在浏览器的语言设置中首选中文。当大厂服务器检测到大量中文搜索流量且无法定位到中国大陆时，算法会倾向于将其标记为香港。或者大量的用户在使用该IP时启动了GPS定位，且将IP定位至香港则也会导致所谓”送中“现象。**所以对于通过BPB Panel方式建立的节点必须配置属于自己的域名**

[NAT64套壳混淆代码](https://github.com/yonggekkk/Cloudflare-vless-trojan/blob/main/Vless_workers_pages/nat64%E5%A5%97%E5%A3%B3%E7%89%88%E6%B7%B7%E6%B7%86.js)


## BPB面板设置

点击https://[域名]/panel，

<img src="/public/vless.png" width=600/>

<img src="/public/routing_rules.png" width=600/>


## Cloudflare IP扫描


https://www.nslookup.io/domains/bpb.yousef.isegaro.com/dns-records/
或

https://www.nslookup.io/domains/cdn.xn--b6gac.eu.org/dns-records/

> 注意第二个域名有导入到香港的可能

## Cloudflare Proxy IP失效问题

BPB Panel 科学上网的本质是Cloudflare的Worker项目，由于Cloudflare为防止出现在CDN环境中循环访问，禁止Worker项目访问其他托管到Cloudflare上的网站。这就使得原生的BPB Panel的IP会无法访问如推特这类网站。为解决这一问题，BPB Panel提出了通过Proxy IP的方式进行反向代理访问。

<img src="/public/cf_worker.png" width=600/>
<img src="/public/cf_worker_banned.png" width=600/>
<img src="/public/cf_proxy.png" width=600/>

目前较为成熟的解决方案有[Cloudflare Vless Trojan](https://github.com/yonggekkk/Cloudflare-vless-trojan),它通过NAT64自动生成proxy ip。

打开Cloudflare的Workers，点击***从Hello World开始**，部署一个空项目。将[NAT64套壳混淆代码](https://github.com/yonggekkk/Cloudflare-vless-trojan/blob/main/Vless_workers_pages/nat64%E5%A5%97%E5%A3%B3%E7%89%88%E6%B7%B7%E6%B7%86.js)复制部署。

加入您的随机分配域名为xwx.pages.dev，uuid为891e4bfc-f1e4-4757-825a-3f3d35269dsa，请在浏览器中打开：https://xwx.pages.dev/891e4bfc-f1e4-4757-825a-3f3d35269dsa 进入节点订阅页面。

在host上选择一个干净的优选IP即可。