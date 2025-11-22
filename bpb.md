# BPB Panel 配置

BPB Panel是一款基于Cloudflare Worker边缘计算的代理软件，由于众所周知的原因直接部署会导致封杀所以便有个各个魔改版本如：

1. [bia-pain-bache](https://github.com/bia-pain-bache/BPB-Worker-Panel)
2. [NAT64套壳混淆代码](https://github.com/yonggekkk/Cloudflare-vless-trojan/blob/main/Vless_workers_pages/nat64%E5%A5%97%E5%A3%B3%E7%89%88%E6%B7%B7%E6%B7%86.js)

## Bia Pain Bache版本 4.0.1

在变量中设置好UUID、TR_PASS、PROXY_IP三个变量。然后绑定kv空间，在这里注意变量名称需要为小写。




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